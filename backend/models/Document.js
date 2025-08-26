/**
 * Document Model - File Upload and Document Management
 * Comprehensive document tracking with versioning and metadata
 */

const mongoose = require('mongoose');

// Document version schema
const documentVersionSchema = new mongoose.Schema({
  versionNumber: {
    type: Number,
    required: true,
    min: 1
  },
  filename: {
    type: String,
    required: true
  },
  filepath: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  checksum: String,
  uploadDate: {
    type: Date,
    default: Date.now
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  changes: String, // Description of changes in this version
  isActive: {
    type: Boolean,
    default: true
  }
}, { _id: false });

// Main document schema
const documentSchema = new mongoose.Schema({
  originalName: {
    type: String,
    required: true,
    maxlength: 255
  },
  
  category: {
    type: String,
    enum: [
      'policy',
      'certificate',
      'report',
      'invoice',
      'contract',
      'evidence',
      'calculation',
      'template',
      'other'
    ],
    default: 'other'
  },
  
  fileType: {
    type: String,
    enum: ['document', 'spreadsheet', 'image', 'archive', 'presentation'],
    required: true
  },
  
  mimeType: {
    type: String,
    required: true
  },
  
  // Current version info (for quick access)
  currentVersion: {
    versionNumber: {
      type: Number,
      default: 1
    },
    filename: String,
    filepath: String,
    size: Number,
    checksum: String
  },
  
  // All versions
  versions: [documentVersionSchema],
  
  // Association with company and reports
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
    index: true
  },
  
  reportId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Report',
    index: true
  },
  
  moduleId: {
    type: String,
    enum: ['B0', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10', 'B11', 
           'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9'],
    index: true
  },
  
  // Document metadata
  description: {
    type: String,
    maxlength: 1000
  },
  
  tags: [{
    type: String,
    maxlength: 50
  }],
  
  // Access control
  visibility: {
    type: String,
    enum: ['private', 'company', 'public'],
    default: 'company'
  },
  
  accessPermissions: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    permission: {
      type: String,
      enum: ['read', 'write', 'delete'],
      default: 'read'
    }
  }],
  
  // Upload and processing info
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  uploadDate: {
    type: Date,
    default: Date.now
  },
  
  lastModified: {
    type: Date,
    default: Date.now
  },
  
  lastModifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  
  // Processing status
  processingStatus: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed'],
    default: 'pending'
  },
  
  processingErrors: [String],
  
  // Security and compliance
  virusScanStatus: {
    type: String,
    enum: ['pending', 'clean', 'infected', 'failed'],
    default: 'pending'
  },
  
  virusScanDate: Date,
  
  encryptionStatus: {
    type: String,
    enum: ['none', 'encrypted'],
    default: 'none'
  },
  
  // Retention and deletion
  retentionPolicy: {
    retainUntil: Date,
    autoDelete: {
      type: Boolean,
      default: false
    }
  },
  
  isDeleted: {
    type: Boolean,
    default: false
  },
  
  deletedAt: Date,
  
  deletedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  
  // Analytics and usage
  downloadCount: {
    type: Number,
    default: 0
  },
  
  viewCount: {
    type: Number,
    default: 0
  },
  
  lastAccessed: Date,
  
  // External references
  externalReferences: [{
    system: String,
    referenceId: String,
    referenceType: String
  }]
}, {
  timestamps: true,
  collection: 'documents'
});

// Indexes for performance
documentSchema.index({ companyId: 1, category: 1, uploadDate: -1 });
documentSchema.index({ reportId: 1, moduleId: 1 });
documentSchema.index({ uploadedBy: 1, uploadDate: -1 });
documentSchema.index({ tags: 1 });
documentSchema.index({ 'currentVersion.checksum': 1 });
documentSchema.index({ isDeleted: 1, retentionPolicy: 1 });
documentSchema.index({ processingStatus: 1, virusScanStatus: 1 });

// Text search index
documentSchema.index({
  originalName: 'text',
  description: 'text',
  tags: 'text'
});

// Virtual for current file path
documentSchema.virtual('currentFilePath').get(function() {
  return this.currentVersion.filepath;
});

// Virtual for file extension
documentSchema.virtual('fileExtension').get(function() {
  const filename = this.currentVersion.filename || this.originalName;
  return filename.split('.').pop().toLowerCase();
});

// Virtual for human readable file size
documentSchema.virtual('humanReadableSize').get(function() {
  const bytes = this.currentVersion.size || 0;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  if (bytes === 0) return '0 Bytes';
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
});

// Instance method to add new version
documentSchema.methods.addVersion = function(versionData, uploadedBy, changes = '') {
  const newVersionNumber = this.versions.length + 1;
  
  // Deactivate current versions
  this.versions.forEach(version => version.isActive = false);
  
  // Add new version
  const newVersion = {
    versionNumber: newVersionNumber,
    filename: versionData.filename,
    filepath: versionData.filepath,
    size: versionData.size,
    checksum: versionData.checksum,
    uploadDate: new Date(),
    uploadedBy,
    changes,
    isActive: true
  };
  
  this.versions.push(newVersion);
  
  // Update current version info
  this.currentVersion = {
    versionNumber: newVersionNumber,
    filename: versionData.filename,
    filepath: versionData.filepath,
    size: versionData.size,
    checksum: versionData.checksum
  };
  
  this.lastModified = new Date();
  this.lastModifiedBy = uploadedBy;
  
  return newVersion;
};

// Instance method to get active version
documentSchema.methods.getActiveVersion = function() {
  return this.versions.find(version => version.isActive) || this.versions[this.versions.length - 1];
};

// Instance method to check user access
documentSchema.methods.hasAccess = function(userId, permission = 'read') {
  // Check if user is the owner
  if (this.uploadedBy.toString() === userId.toString()) {
    return true;
  }
  
  // Check specific permissions
  const userPermission = this.accessPermissions.find(
    perm => perm.userId.toString() === userId.toString()
  );
  
  if (!userPermission) {
    return this.visibility === 'public';
  }
  
  // Permission hierarchy: delete > write > read
  const permissionLevels = { read: 1, write: 2, delete: 3 };
  return permissionLevels[userPermission.permission] >= permissionLevels[permission];
};

// Instance method to record access
documentSchema.methods.recordAccess = function(accessType = 'view') {
  this.lastAccessed = new Date();
  
  if (accessType === 'view') {
    this.viewCount = (this.viewCount || 0) + 1;
  } else if (accessType === 'download') {
    this.downloadCount = (this.downloadCount || 0) + 1;
  }
};

// Static method to find documents by company
documentSchema.statics.findByCompany = function(companyId, filters = {}) {
  const query = { 
    companyId,
    isDeleted: false
  };
  
  if (filters.category) query.category = filters.category;
  if (filters.fileType) query.fileType = filters.fileType;
  if (filters.reportId) query.reportId = filters.reportId;
  if (filters.moduleId) query.moduleId = filters.moduleId;
  if (filters.uploadedBy) query.uploadedBy = filters.uploadedBy;
  
  return this.find(query)
    .populate('uploadedBy', 'profile.firstName profile.lastName')
    .populate('reportId', 'reportMetadata.reportingPeriod')
    .sort({ uploadDate: -1 });
};

// Static method for full-text search
documentSchema.statics.searchDocuments = function(companyId, searchTerm, filters = {}) {
  const query = {
    companyId,
    isDeleted: false,
    $text: { $search: searchTerm }
  };
  
  Object.assign(query, filters);
  
  return this.find(query, { score: { $meta: 'textScore' } })
    .sort({ score: { $meta: 'textScore' } })
    .populate('uploadedBy', 'profile.firstName profile.lastName');
};

// Static method to find expired documents
documentSchema.statics.findExpiredDocuments = function() {
  return this.find({
    'retentionPolicy.retainUntil': { $lt: new Date() },
    'retentionPolicy.autoDelete': true,
    isDeleted: false
  });
};

// Pre-save middleware
documentSchema.pre('save', function(next) {
  this.lastModified = new Date();
  
  // Ensure at least one version exists
  if (this.versions.length === 0 && this.currentVersion.filename) {
    this.versions.push({
      versionNumber: 1,
      filename: this.currentVersion.filename,
      filepath: this.currentVersion.filepath,
      size: this.currentVersion.size,
      checksum: this.currentVersion.checksum,
      uploadDate: this.uploadDate || new Date(),
      uploadedBy: this.uploadedBy,
      isActive: true
    });
  }
  
  next();
});

// Export model
const Document = mongoose.model('Document', documentSchema);
module.exports = Document;