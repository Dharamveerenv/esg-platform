/**
 * File Service - Comprehensive File Upload and Document Management
 * Handles secure file uploads, processing, and document categorization
 */

const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');
const sharp = require('sharp');
const ExcelJS = require('exceljs');
const { ValidationError, ServerError } = require('../utils/appError');

class FileService {
  constructor() {
    this.uploadDir = path.join(__dirname, '../uploads');
    this.maxFileSize = 10 * 1024 * 1024; // 10MB
    this.allowedTypes = {
      document: ['pdf', 'doc', 'docx', 'txt'],
      spreadsheet: ['xls', 'xlsx', 'csv'],
      image: ['jpg', 'jpeg', 'png', 'gif', 'svg'],
      archive: ['zip', 'rar', '7z'],
      presentation: ['ppt', 'pptx']
    };
    this.dangerousTypes = ['exe', 'bat', 'sh', 'cmd', 'scr', 'com', 'pif', 'js', 'jar'];
    
    this.initializeDirectories();
  }

  async initializeDirectories() {
    try {
      await fs.mkdir(this.uploadDir, { recursive: true });
      await fs.mkdir(path.join(this.uploadDir, 'documents'), { recursive: true });
      await fs.mkdir(path.join(this.uploadDir, 'images'), { recursive: true });
      await fs.mkdir(path.join(this.uploadDir, 'compressed'), { recursive: true });
      await fs.mkdir(path.join(this.uploadDir, 'temp'), { recursive: true });
    } catch (error) {
      console.error('Error creating upload directories:', error);
    }
  }

  /**
   * Process uploaded file with security checks and optimization
   */
  async processUpload(file, options = {}) {
    const {
      category = 'document',
      companyId,
      reportId,
      moduleId,
      userId,
      metadata = {}
    } = options;

    try {
      // Security validation
      await this.validateFile(file);
      
      // Generate secure filename
      const filename = this.generateSecureFilename(file.originalname);
      const filepath = this.getFilePath(category, filename);
      
      // Save original file
      await fs.writeFile(filepath, file.buffer);
      
      // Process file based on type
      const processedFile = await this.processFileByType(filepath, file, category);
      
      // Generate metadata
      const fileMetadata = {
        originalName: file.originalname,
        filename: processedFile.filename,
        filepath: processedFile.filepath,
        size: processedFile.size,
        mimeType: file.mimetype,
        category,
        companyId,
        reportId,
        moduleId,
        uploadedBy: userId,
        uploadDate: new Date(),
        checksum: await this.calculateChecksum(processedFile.filepath),
        processed: processedFile.processed,
        ...metadata
      };

      // Virus scan (placeholder - integrate with actual antivirus)
      await this.performVirusScan(processedFile.filepath);
      
      return fileMetadata;
      
    } catch (error) {
      console.error('File processing error:', error);
      throw new ServerError('Failed to process file upload');
    }
  }

  /**
   * Validate file security and constraints
   */
  async validateFile(file) {
    // Check file size
    if (file.size > this.maxFileSize) {
      throw new ValidationError(`File size exceeds maximum allowed size of ${this.maxFileSize / 1024 / 1024}MB`);
    }

    // Check file extension
    const extension = path.extname(file.originalname).toLowerCase().substring(1);
    
    if (this.dangerousTypes.includes(extension)) {
      throw new ValidationError('File type not allowed for security reasons');
    }

    // Validate MIME type matches extension
    if (!this.validateMimeType(file.mimetype, extension)) {
      throw new ValidationError('File type validation failed');
    }

    // Check for null bytes (potential security issue)
    if (file.originalname.includes('\0')) {
      throw new ValidationError('Invalid filename detected');
    }

    // Validate filename length
    if (file.originalname.length > 255) {
      throw new ValidationError('Filename too long');
    }

    return true;
  }

  /**
   * Validate MIME type against file extension
   */
  validateMimeType(mimeType, extension) {
    const mimeMap = {
      'pdf': 'application/pdf',
      'doc': 'application/msword',
      'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'xls': 'application/vnd.ms-excel',
      'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'csv': 'text/csv',
      'txt': 'text/plain',
      'jpg': 'image/jpeg',
      'jpeg': 'image/jpeg',
      'png': 'image/png',
      'gif': 'image/gif',
      'svg': 'image/svg+xml'
    };

    return mimeMap[extension] === mimeType || 
           mimeType === 'application/octet-stream'; // Allow generic binary
  }

  /**
   * Generate secure filename with timestamp and hash
   */
  generateSecureFilename(originalName) {
    const extension = path.extname(originalName).toLowerCase();
    const baseName = path.basename(originalName, extension);
    const timestamp = Date.now();
    const randomHash = crypto.randomBytes(8).toString('hex');
    
    // Sanitize base name
    const sanitizedName = baseName
      .replace(/[^a-zA-Z0-9.-]/g, '_')
      .substring(0, 50);
    
    return `${timestamp}_${randomHash}_${sanitizedName}${extension}`;
  }

  /**
   * Get file path based on category
   */
  getFilePath(category, filename) {
    const categoryDir = this.getCategoryDirectory(category);
    return path.join(this.uploadDir, categoryDir, filename);
  }

  /**
   * Get directory name for file category
   */
  getCategoryDirectory(category) {
    const categoryMap = {
      document: 'documents',
      spreadsheet: 'documents',
      image: 'images',
      archive: 'documents',
      presentation: 'documents'
    };
    
    return categoryMap[category] || 'documents';
  }

  /**
   * Process file based on its type
   */
  async processFileByType(filepath, file, category) {
    let processed = false;
    let finalPath = filepath;
    let finalSize = file.size;

    try {
      if (category === 'image') {
        const processedImage = await this.processImage(filepath);
        finalPath = processedImage.filepath;
        finalSize = processedImage.size;
        processed = true;
      } else if (category === 'spreadsheet') {
        await this.validateSpreadsheet(filepath);
        processed = true;
      }

      return {
        filepath: finalPath,
        filename: path.basename(finalPath),
        size: finalSize,
        processed
      };

    } catch (error) {
      console.error('File type processing error:', error);
      // Return original file if processing fails
      return {
        filepath,
        filename: path.basename(filepath),
        size: file.size,
        processed: false
      };
    }
  }

  /**
   * Process and optimize images
   */
  async processImage(filepath) {
    try {
      const compressedPath = filepath.replace(/\.(jpg|jpeg|png)$/i, '_compressed.$1');
      
      await sharp(filepath)
        .resize(1920, 1080, { 
          fit: 'inside', 
          withoutEnlargement: true 
        })
        .jpeg({ 
          quality: 85, 
          progressive: true 
        })
        .toFile(compressedPath);

      // Get compressed file size
      const stats = await fs.stat(compressedPath);
      
      // Use compressed version if it's smaller
      if (stats.size < (await fs.stat(filepath)).size) {
        await fs.unlink(filepath); // Remove original
        return {
          filepath: compressedPath,
          size: stats.size
        };
      } else {
        await fs.unlink(compressedPath); // Remove compressed version
        return {
          filepath,
          size: (await fs.stat(filepath)).size
        };
      }

    } catch (error) {
      console.error('Image processing error:', error);
      return {
        filepath,
        size: (await fs.stat(filepath)).size
      };
    }
  }

  /**
   * Validate spreadsheet files
   */
  async validateSpreadsheet(filepath) {
    try {
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.readFile(filepath);
      
      // Basic validation - check if file is readable
      const worksheetCount = workbook.worksheets.length;
      if (worksheetCount === 0) {
        throw new ValidationError('Spreadsheet contains no worksheets');
      }

      return true;
    } catch (error) {
      if (error instanceof ValidationError) {
        throw error;
      }
      throw new ValidationError('Invalid spreadsheet file');
    }
  }

  /**
   * Calculate file checksum for integrity verification
   */
  async calculateChecksum(filepath) {
    try {
      const fileBuffer = await fs.readFile(filepath);
      return crypto.createHash('sha256').update(fileBuffer).digest('hex');
    } catch (error) {
      console.error('Checksum calculation error:', error);
      return null;
    }
  }

  /**
   * Perform virus scan (placeholder for actual antivirus integration)
   */
  async performVirusScan(filepath) {
    // Placeholder for virus scanning
    // In production, integrate with ClamAV or similar
    
    try {
      // Simple check for suspicious patterns in filename
      const filename = path.basename(filepath).toLowerCase();
      const suspiciousPatterns = ['.exe', '.bat', '.scr', '.com', '.pif'];
      
      for (const pattern of suspiciousPatterns) {
        if (filename.includes(pattern)) {
          throw new ValidationError('File failed security scan');
        }
      }
      
      return { clean: true, scanDate: new Date() };
    } catch (error) {
      throw new ValidationError('File failed virus scan');
    }
  }

  /**
   * Delete file and cleanup
   */
  async deleteFile(filepath) {
    try {
      await fs.unlink(filepath);
      return true;
    } catch (error) {
      console.error('File deletion error:', error);
      return false;
    }
  }

  /**
   * Get file info without reading content
   */
  async getFileInfo(filepath) {
    try {
      const stats = await fs.stat(filepath);
      return {
        size: stats.size,
        created: stats.birthtime,
        modified: stats.mtime,
        exists: true
      };
    } catch (error) {
      return { exists: false };
    }
  }

  /**
   * Create file backup
   */
  async createBackup(filepath, backupDir) {
    try {
      const filename = path.basename(filepath);
      const backupPath = path.join(backupDir, `backup_${Date.now()}_${filename}`);
      
      await fs.copyFile(filepath, backupPath);
      return backupPath;
    } catch (error) {
      console.error('Backup creation error:', error);
      throw new ServerError('Failed to create file backup');
    }
  }

  /**
   * Cleanup temporary files older than specified hours
   */
  async cleanupTempFiles(hoursOld = 24) {
    try {
      const tempDir = path.join(this.uploadDir, 'temp');
      const files = await fs.readdir(tempDir);
      const cutoffTime = Date.now() - (hoursOld * 60 * 60 * 1000);

      for (const file of files) {
        const filepath = path.join(tempDir, file);
        const stats = await fs.stat(filepath);
        
        if (stats.mtime.getTime() < cutoffTime) {
          await fs.unlink(filepath);
        }
      }
    } catch (error) {
      console.error('Temp file cleanup error:', error);
    }
  }
}

module.exports = new FileService();