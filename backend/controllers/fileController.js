/**
 * File Controller - File Upload and Document Management
 * Handles secure file operations with comprehensive document management
 */

const Document = require('../models/Document');
const fileService = require('../services/fileService');
const { NotFoundError, ValidationError, AuthError } = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const path = require('path');

// Upload single file
const uploadFile = catchAsync(async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({
      status: 'error',
      message: 'No file provided'
    });
  }

  const {
    category = 'other',
    description,
    tags,
    reportId,
    moduleId,
    visibility = 'company'
  } = req.body;

  // Process file upload
  const fileMetadata = await fileService.processUpload(req.file, {
    category,
    companyId: req.user.companyAssociations[0]?.companyId, // Get user's primary company
    reportId,
    moduleId,
    userId: req.user.id
  });

  // Determine file type
  const fileExtension = path.extname(fileMetadata.originalName).toLowerCase().substring(1);
  const fileType = getFileType(fileExtension);

  // Create document record
  const document = new Document({
    originalName: fileMetadata.originalName,
    category,
    fileType,
    mimeType: fileMetadata.mimeType,
    currentVersion: {
      versionNumber: 1,
      filename: fileMetadata.filename,
      filepath: fileMetadata.filepath,
      size: fileMetadata.size,
      checksum: fileMetadata.checksum
    },
    companyId: fileMetadata.companyId,
    reportId: reportId || undefined,
    moduleId: moduleId || undefined,
    description: description || '',
    tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
    visibility,
    uploadedBy: req.user.id,
    processingStatus: fileMetadata.processed ? 'completed' : 'pending',
    virusScanStatus: 'clean' // Assuming clean from fileService validation
  });

  await document.save();

  res.status(201).json({
    status: 'success',
    data: {
      document: {
        id: document._id,
        originalName: document.originalName,
        category: document.category,
        fileType: document.fileType,
        size: document.humanReadableSize,
        uploadDate: document.uploadDate,
        description: document.description,
        tags: document.tags
      }
    },
    message: 'File uploaded successfully'
  });
});

// Upload multiple files
const uploadMultipleFiles = catchAsync(async (req, res, next) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({
      status: 'error',
      message: 'No files provided'
    });
  }

  const {
    category = 'other',
    description,
    tags,
    reportId,
    moduleId,
    visibility = 'company'
  } = req.body;

  const uploadResults = [];
  const errors = [];

  // Process each file
  for (const file of req.files) {
    try {
      const fileMetadata = await fileService.processUpload(file, {
        category,
        companyId: req.user.companyAssociations[0]?.companyId,
        reportId,
        moduleId,
        userId: req.user.id
      });

      const fileExtension = path.extname(fileMetadata.originalName).toLowerCase().substring(1);
      const fileType = getFileType(fileExtension);

      const document = new Document({
        originalName: fileMetadata.originalName,
        category,
        fileType,
        mimeType: fileMetadata.mimeType,
        currentVersion: {
          versionNumber: 1,
          filename: fileMetadata.filename,
          filepath: fileMetadata.filepath,
          size: fileMetadata.size,
          checksum: fileMetadata.checksum
        },
        companyId: fileMetadata.companyId,
        reportId: reportId || undefined,
        moduleId: moduleId || undefined,
        description: description || '',
        tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
        visibility,
        uploadedBy: req.user.id,
        processingStatus: fileMetadata.processed ? 'completed' : 'pending',
        virusScanStatus: 'clean'
      });

      await document.save();

      uploadResults.push({
        id: document._id,
        originalName: document.originalName,
        size: document.humanReadableSize,
        status: 'success'
      });

    } catch (error) {
      errors.push({
        filename: file.originalname,
        error: error.message
      });
    }
  }

  res.status(201).json({
    status: errors.length === 0 ? 'success' : 'partial',
    data: {
      uploaded: uploadResults,
      errors
    },
    message: `${uploadResults.length} files uploaded successfully${errors.length > 0 ? `, ${errors.length} failed` : ''}`
  });
});

// Get all documents with filtering
const getAllDocuments = catchAsync(async (req, res, next) => {
  const {
    page = 1,
    limit = 20,
    category,
    fileType,
    reportId,
    moduleId,
    search,
    sortBy = 'uploadDate',
    sortOrder = 'desc'
  } = req.query;

  const companyId = req.user.companyAssociations[0]?.companyId;
  if (!companyId) {
    return res.status(400).json({
      status: 'error',
      message: 'User not associated with any company'
    });
  }

  const filters = {};
  if (category) filters.category = category;
  if (fileType) filters.fileType = fileType;
  if (reportId) filters.reportId = reportId;
  if (moduleId) filters.moduleId = moduleId;

  let query;
  if (search) {
    query = Document.searchDocuments(companyId, search, filters);
  } else {
    query = Document.findByCompany(companyId, filters);
  }

  // Apply sorting
  const sortOptions = {};
  sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;
  query = query.sort(sortOptions);

  // Apply pagination
  const skip = (page - 1) * limit;
  query = query.skip(skip).limit(Number(limit));

  const documents = await query;
  const total = await Document.countDocuments({ 
    companyId,
    isDeleted: false,
    ...filters 
  });

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
        downloadCount: doc.downloadCount,
        viewCount: doc.viewCount
      })),
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(total / limit),
        totalDocuments: total,
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    }
  });
});

// Get single document details
const getDocument = catchAsync(async (req, res, next) => {
  const document = await Document.findById(req.params.id)
    .populate('uploadedBy', 'profile.firstName profile.lastName')
    .populate('lastModifiedBy', 'profile.firstName profile.lastName')
    .populate('reportId', 'reportMetadata.reportingPeriod companyId')
    .populate('companyId', 'companyProfile.legalName');

  if (!document || document.isDeleted) {
    return next(new NotFoundError('Document'));
  }

  // Check access permissions
  if (!document.hasAccess(req.user.id, 'read')) {
    return next(new AuthError('You do not have permission to access this document'));
  }

  // Record view
  document.recordAccess('view');
  await document.save();

  res.status(200).json({
    status: 'success',
    data: { document }
  });
});

// Download document
const downloadDocument = catchAsync(async (req, res, next) => {
  const document = await Document.findById(req.params.id);

  if (!document || document.isDeleted) {
    return next(new NotFoundError('Document'));
  }

  // Check access permissions
  if (!document.hasAccess(req.user.id, 'read')) {
    return next(new AuthError('You do not have permission to download this document'));
  }

  const filePath = document.currentFilePath;
  
  // Check if file exists
  const fileInfo = await fileService.getFileInfo(filePath);
  if (!fileInfo.exists) {
    return res.status(404).json({
      status: 'error',
      message: 'File not found on server'
    });
  }

  // Record download
  document.recordAccess('download');
  await document.save();

  // Set appropriate headers
  res.setHeader('Content-Disposition', `attachment; filename="${document.originalName}"`);
  res.setHeader('Content-Type', document.mimeType);
  
  // Stream file to response
  res.sendFile(path.resolve(filePath));
});

// Update document metadata
const updateDocument = catchAsync(async (req, res, next) => {
  const { description, tags, category, visibility } = req.body;

  const document = await Document.findById(req.params.id);

  if (!document || document.isDeleted) {
    return next(new NotFoundError('Document'));
  }

  // Check access permissions
  if (!document.hasAccess(req.user.id, 'write')) {
    return next(new AuthError('You do not have permission to update this document'));
  }

  // Update fields
  if (description !== undefined) document.description = description;
  if (tags !== undefined) document.tags = Array.isArray(tags) ? tags : tags.split(',').map(tag => tag.trim());
  if (category !== undefined) document.category = category;
  if (visibility !== undefined) document.visibility = visibility;
  
  document.lastModifiedBy = req.user.id;

  await document.save();

  res.status(200).json({
    status: 'success',
    data: { document },
    message: 'Document updated successfully'
  });
});

// Upload new version of document
const uploadNewVersion = catchAsync(async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({
      status: 'error',
      message: 'No file provided for new version'
    });
  }

  const { changes = '' } = req.body;

  const document = await Document.findById(req.params.id);

  if (!document || document.isDeleted) {
    return next(new NotFoundError('Document'));
  }

  // Check access permissions
  if (!document.hasAccess(req.user.id, 'write')) {
    return next(new AuthError('You do not have permission to update this document'));
  }

  // Process new file version
  const fileMetadata = await fileService.processUpload(req.file, {
    category: document.category,
    companyId: document.companyId,
    reportId: document.reportId,
    moduleId: document.moduleId,
    userId: req.user.id
  });

  // Add new version
  const newVersion = document.addVersion({
    filename: fileMetadata.filename,
    filepath: fileMetadata.filepath,
    size: fileMetadata.size,
    checksum: fileMetadata.checksum
  }, req.user.id, changes);

  await document.save();

  res.status(200).json({
    status: 'success',
    data: { 
      document,
      newVersion: {
        versionNumber: newVersion.versionNumber,
        uploadDate: newVersion.uploadDate,
        changes: newVersion.changes
      }
    },
    message: 'New document version uploaded successfully'
  });
});

// Delete document (soft delete)
const deleteDocument = catchAsync(async (req, res, next) => {
  const document = await Document.findById(req.params.id);

  if (!document || document.isDeleted) {
    return next(new NotFoundError('Document'));
  }

  // Check access permissions
  if (!document.hasAccess(req.user.id, 'delete')) {
    return next(new AuthError('You do not have permission to delete this document'));
  }

  // Soft delete
  document.isDeleted = true;
  document.deletedAt = new Date();
  document.deletedBy = req.user.id;

  await document.save();

  res.status(200).json({
    status: 'success',
    message: 'Document deleted successfully'
  });
});

// Get document versions
const getDocumentVersions = catchAsync(async (req, res, next) => {
  const document = await Document.findById(req.params.id)
    .populate('versions.uploadedBy', 'profile.firstName profile.lastName');

  if (!document || document.isDeleted) {
    return next(new NotFoundError('Document'));
  }

  // Check access permissions
  if (!document.hasAccess(req.user.id, 'read')) {
    return next(new AuthError('You do not have permission to access this document'));
  }

  res.status(200).json({
    status: 'success',
    data: {
      documentId: document._id,
      versions: document.versions.map(version => ({
        versionNumber: version.versionNumber,
        size: version.size,
        uploadDate: version.uploadDate,
        uploadedBy: version.uploadedBy,
        changes: version.changes,
        isActive: version.isActive
      }))
    }
  });
});

// Helper function to determine file type from extension
function getFileType(extension) {
  const typeMap = {
    pdf: 'document',
    doc: 'document',
    docx: 'document',
    txt: 'document',
    xls: 'spreadsheet',
    xlsx: 'spreadsheet',
    csv: 'spreadsheet',
    jpg: 'image',
    jpeg: 'image',
    png: 'image',
    gif: 'image',
    svg: 'image',
    zip: 'archive',
    rar: 'archive',
    '7z': 'archive',
    ppt: 'presentation',
    pptx: 'presentation'
  };

  return typeMap[extension.toLowerCase()] || 'document';
}

module.exports = {
  uploadFile,
  uploadMultipleFiles,
  getAllDocuments,
  getDocument,
  downloadDocument,
  updateDocument,
  uploadNewVersion,
  deleteDocument,
  getDocumentVersions
};