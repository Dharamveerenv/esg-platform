/**
 * File Routes - File Upload and Document Management
 * Secure file upload routes with comprehensive document management
 */

const express = require('express');
const multer = require('multer');
const {
  uploadFile,
  uploadMultipleFiles,
  getAllDocuments,
  getDocument,
  downloadDocument,
  updateDocument,
  uploadNewVersion,
  deleteDocument,
  getDocumentVersions
} = require('../controllers/fileController');

const { protect, authorize } = require('../middleware/auth');
const { ValidationError } = require('../utils/appError');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.memoryStorage(); // Store files in memory for processing

const fileFilter = (req, file, cb) => {
  // Allowed file types
  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'text/csv',
    'text/plain',
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/svg+xml',
    'application/zip',
    'application/x-rar-compressed',
    'application/x-7z-compressed',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation'
  ];

  // Dangerous file extensions to block
  const dangerousExtensions = ['.exe', '.bat', '.sh', '.cmd', '.scr', '.com', '.pif', '.js', '.jar'];
  const fileExtension = file.originalname.toLowerCase().substring(file.originalname.lastIndexOf('.'));
  
  if (dangerousExtensions.includes(fileExtension)) {
    cb(new ValidationError('File type not allowed for security reasons'), false);
    return;
  }

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new ValidationError('Invalid file type. Allowed types: PDF, Word, Excel, CSV, TXT, Images, ZIP, RAR, PowerPoint'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
    files: 10 // Maximum 10 files at once
  },
  fileFilter: fileFilter
});

// Middleware to handle multer errors
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        status: 'error',
        message: 'File size exceeds 10MB limit'
      });
    }
    if (err.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        status: 'error',
        message: 'Too many files. Maximum 10 files allowed'
      });
    }
    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({
        status: 'error',
        message: 'Unexpected file field'
      });
    }
  }
  
  if (err instanceof ValidationError) {
    return res.status(400).json({
      status: 'error',
      message: err.message
    });
  }
  
  next(err);
};

// Protect all routes
// router.use(protect); // DISABLED for development

// File upload routes
router
  .route('/upload')
  .post(
    authorize('SuperAdmin', 'CompanyAdmin', 'Manager', 'Editor'),
    upload.single('file'),
    handleMulterError,
    uploadFile
  );

router
  .route('/upload/multiple')
  .post(
    authorize('SuperAdmin', 'CompanyAdmin', 'Manager', 'Editor'),
    upload.array('files', 10),
    handleMulterError,
    uploadMultipleFiles
  );

// Document management routes
router
  .route('/')
  .get(getAllDocuments);

router
  .route('/:id')
  .get(getDocument)
  .patch(authorize('SuperAdmin', 'CompanyAdmin', 'Manager', 'Editor'), updateDocument)
  .delete(authorize('SuperAdmin', 'CompanyAdmin', 'Manager'), deleteDocument);

// File download route
router
  .route('/:id/download')
  .get(downloadDocument);

// Document versioning
router
  .route('/:id/versions')
  .get(getDocumentVersions)
  .post(
    authorize('SuperAdmin', 'CompanyAdmin', 'Manager', 'Editor'),
    upload.single('file'),
    handleMulterError,
    uploadNewVersion
  );

// Bulk operations routes
router
  .route('/bulk/delete')
  .post(authorize('SuperAdmin', 'CompanyAdmin'), async (req, res, next) => {
    try {
      const { documentIds } = req.body;
      
      if (!documentIds || !Array.isArray(documentIds)) {
        return res.status(400).json({
          status: 'error',
          message: 'Document IDs array is required'
        });
      }

      const Document = require('../models/Document');
      
      const result = await Document.updateMany(
        { 
          _id: { $in: documentIds },
          isDeleted: false
        },
        { 
          isDeleted: true,
          deletedAt: new Date(),
          deletedBy: req.user.id
        }
      );

      res.status(200).json({
        status: 'success',
        data: {
          deletedCount: result.modifiedCount
        },
        message: `${result.modifiedCount} documents deleted successfully`
      });

    } catch (error) {
      next(error);
    }
  });

// Document categories and statistics
router
  .route('/stats/overview')
  .get(async (req, res, next) => {
    try {
      const Document = require('../models/Document');
      const companyId = req.user.companyAssociations[0]?.companyId;

      if (!companyId) {
        return res.status(400).json({
          status: 'error',
          message: 'User not associated with any company'
        });
      }

      const stats = await Document.aggregate([
        { $match: { companyId: companyId, isDeleted: false } },
        {
          $group: {
            _id: null,
            totalDocuments: { $sum: 1 },
            totalSize: { $sum: '$currentVersion.size' },
            categoryBreakdown: {
              $push: {
                category: '$category',
                size: '$currentVersion.size'
              }
            },
            fileTypeBreakdown: {
              $push: {
                fileType: '$fileType',
                size: '$currentVersion.size'
              }
            }
          }
        },
        {
          $project: {
            totalDocuments: 1,
            totalSize: 1,
            categories: {
              $reduce: {
                input: '$categoryBreakdown',
                initialValue: {},
                in: {
                  $mergeObjects: [
                    '$$value',
                    {
                      $arrayToObject: [
                        [{
                          k: '$$this.category',
                          v: {
                            $add: [
                              { $ifNull: [{ $getField: { field: '$$this.category', input: '$$value' } }, 0] },
                              1
                            ]
                          }
                        }]
                      ]
                    }
                  ]
                }
              }
            },
            fileTypes: {
              $reduce: {
                input: '$fileTypeBreakdown',
                initialValue: {},
                in: {
                  $mergeObjects: [
                    '$$value',
                    {
                      $arrayToObject: [
                        [{
                          k: '$$this.fileType',
                          v: {
                            $add: [
                              { $ifNull: [{ $getField: { field: '$$this.fileType', input: '$$value' } }, 0] },
                              1
                            ]
                          }
                        }]
                      ]
                    }
                  ]
                }
              }
            }
          }
        }
      ]);

      const result = stats[0] || {
        totalDocuments: 0,
        totalSize: 0,
        categories: {},
        fileTypes: {}
      };

      // Convert size to human readable format
      const humanReadableSize = (bytes) => {
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        if (bytes === 0) return '0 Bytes';
        const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
      };

      res.status(200).json({
        status: 'success',
        data: {
          totalDocuments: result.totalDocuments,
          totalSize: humanReadableSize(result.totalSize),
          categoryBreakdown: result.categories,
          fileTypeBreakdown: result.fileTypes,
          storageUsed: result.totalSize
        }
      });

    } catch (error) {
      next(error);
    }
  });

// Search documents
router
  .route('/search')
  .get(async (req, res, next) => {
    try {
      const { q: searchTerm, category, fileType, limit = 20 } = req.query;
      
      if (!searchTerm) {
        return res.status(400).json({
          status: 'error',
          message: 'Search term is required'
        });
      }

      const Document = require('../models/Document');
      const companyId = req.user.companyAssociations[0]?.companyId;

      const filters = {};
      if (category) filters.category = category;
      if (fileType) filters.fileType = fileType;

      const documents = await Document.searchDocuments(companyId, searchTerm, filters)
        .limit(Number(limit))
        .populate('uploadedBy', 'profile.firstName profile.lastName');

      res.status(200).json({
        status: 'success',
        results: documents.length,
        data: {
          documents: documents.map(doc => ({
            id: doc._id,
            originalName: doc.originalName,
            category: doc.category,
            fileType: doc.fileType,
            size: doc.humanReadableSize,
            uploadDate: doc.uploadDate,
            uploadedBy: doc.uploadedBy,
            description: doc.description,
            tags: doc.tags,
            relevanceScore: doc.score
          }))
        }
      });

    } catch (error) {
      next(error);
    }
  });

module.exports = router;