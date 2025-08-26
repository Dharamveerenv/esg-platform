/**
 * VSME ESG Platform - User Model
 * MongoDB Schema with validation and security features
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  
  profile: {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
      maxlength: 50
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
      maxlength: 50
    },
    position: {
      type: String,
      trim: true,
      maxlength: 100
    },
    department: {
      type: String,
      enum: ['Management', 'Sustainability', 'Operations', 'Finance', 'HR', 'IT', 'Legal', 'Other'],
      default: 'Other'
    },
    phoneNumber: {
      type: String,
      validate: {
        validator: function(phone) {
          return !phone || /^[\+]?[1-9][\d]{0,15}$/.test(phone);
        },
        message: 'Please enter a valid phone number'
      }
    },
    avatar: {
      url: String,
      filename: String,
      uploadDate: { type: Date, default: Date.now }
    },
    bio: {
      type: String,
      maxlength: 500
    },
    linkedInProfile: String,
    expertise: [{
      type: String,
      enum: ['ESG', 'Carbon Accounting', 'Sustainability', 'Risk Management', 'Compliance', 'Data Analysis', 'Project Management', 'Other']
    }]
  },
  
  companyAssociations: [{
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: true
    },
    role: {
      type: String, 
      enum: ['SuperAdmin', 'CompanyAdmin', 'Manager', 'Editor', 'Viewer'],
      required: true
    },
    permissions: [{
      module: {
        type: String,
        enum: ['B0', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10', 'B11', 
               'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'REPORTS', 'USERS', 'COMPANY', 'AUDIT']
      },
      actions: [{
        type: String,
        enum: ['read', 'write', 'approve', 'calculate', 'export', 'manage']
      }]
    }],
    joinedAt: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true },
    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    invitationStatus: {
      type: String,
      enum: ['pending', 'accepted', 'rejected', 'expired'],
      default: 'accepted'
    },
    invitationToken: String,
    invitationExpires: Date
  }],
  
  preferences: {
    language: {
      type: String,
      enum: ['en', 'es', 'fr', 'de', 'it', 'pt'],
      default: 'en'
    },
    timezone: {
      type: String,
      default: 'Europe/Dublin'
    },
    currency: {
      type: String,
      enum: ['EUR', 'USD', 'GBP', 'CAD', 'AUD'],
      default: 'EUR'
    },
    notifications: {
      email: { type: Boolean, default: true },
      inApp: { type: Boolean, default: true },
      reportReminders: { type: Boolean, default: true },
      dataDeadlines: { type: Boolean, default: true },
      approvalRequests: { type: Boolean, default: true },
      systemUpdates: { type: Boolean, default: false }
    },
    dashboard: {
      defaultView: {
        type: String,
        enum: ['overview', 'emissions', 'reports', 'analytics'],
        default: 'overview'
      },
      compactMode: { type: Boolean, default: false },
      showTutorials: { type: Boolean, default: true }
    }
  },
  
  authentication: {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 8,
      select: false
    },
    twoFactorEnabled: { type: Boolean, default: false },
    twoFactorSecret: { type: String, select: false },
    backupCodes: [{
      code: { type: String, select: false },
      used: { type: Boolean, default: false },
      usedAt: Date
    }],
    lastLogin: Date,
    loginHistory: [{
      timestamp: { type: Date, default: Date.now },
      ipAddress: String,
      userAgent: String,
      location: String,
      success: { type: Boolean, default: true }
    }],
    loginAttempts: { type: Number, default: 0 },
    lockUntil: Date,
    passwordResetToken: { type: String, select: false },
    passwordResetExpires: Date,
    emailVerified: { type: Boolean, default: false },
    emailVerificationToken: { type: String, select: false },
    lastPasswordChange: { type: Date, default: Date.now }
  },
  
  createdAt: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  },
  onboardingCompleted: {
    type: Boolean,
    default: false
  },
  lastActiveAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});


// Virtual for full name
userSchema.virtual('fullName').get(function() {
  return `${this.profile.firstName} ${this.profile.lastName}`;
});

// Pre-save middleware to hash password
userSchema.pre('save', async function(next) {
  if (!this.isModified('authentication.password')) return next();
  
  // Hash password with cost of 12
  this.authentication.password = await bcrypt.hash(this.authentication.password, 12);
  this.authentication.lastPasswordChange = new Date();
  next();
});

// Pre-save middleware to maintain login history limit
userSchema.pre('save', function(next) {
  if (this.authentication.loginHistory && this.authentication.loginHistory.length > 10) {
    this.authentication.loginHistory = this.authentication.loginHistory.slice(0, 10);
  }
  next();
});

// Instance method to check password
userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// Instance method to check if account is locked
userSchema.methods.isLocked = function() {
  return !!(this.authentication.lockUntil && this.authentication.lockUntil > Date.now());
};

// Instance method to increment login attempts
userSchema.methods.incLoginAttempts = function() {
  // If we have a previous lock that has expired, restart at 1
  if (this.authentication.lockUntil && this.authentication.lockUntil < Date.now()) {
    return this.updateOne({
      $unset: { 'authentication.lockUntil': 1 },
      $set: { 'authentication.loginAttempts': 1 }
    });
  }
  
  const updates = { $inc: { 'authentication.loginAttempts': 1 } };
  
  // Lock account after 5 failed attempts for 2 hours
  if (this.authentication.loginAttempts + 1 >= 5 && !this.isLocked()) {
    updates.$set = { 'authentication.lockUntil': Date.now() + 2 * 60 * 60 * 1000 };
  }
  
  return this.updateOne(updates);
};

// Instance method to reset login attempts
userSchema.methods.resetLoginAttempts = function() {
  return this.updateOne({
    $unset: {
      'authentication.loginAttempts': 1,
      'authentication.lockUntil': 1
    }
  });
};

// Instance method to log login attempt
userSchema.methods.logLoginAttempt = function(ipAddress, userAgent, success = true, location = null) {
  const loginEntry = {
    timestamp: new Date(),
    ipAddress,
    userAgent,
    location,
    success
  };
  
  // Keep only last 10 login attempts
  this.authentication.loginHistory.unshift(loginEntry);
  if (this.authentication.loginHistory.length > 10) {
    this.authentication.loginHistory = this.authentication.loginHistory.slice(0, 10);
  }
  
  if (success) {
    this.authentication.lastLogin = new Date();
  }
};

// Instance method to check if password changed after JWT was issued
userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if (this.authentication.lastPasswordChange) {
    const changedTimestamp = parseInt(
      this.authentication.lastPasswordChange.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

// Instance method to create password reset token
userSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');
  
  this.authentication.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  
  this.authentication.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
  
  return resetToken;
};

// Instance method to create email verification token
userSchema.methods.createEmailVerificationToken = function() {
  const verificationToken = crypto.randomBytes(32).toString('hex');
  
  this.authentication.emailVerificationToken = crypto
    .createHash('sha256')
    .update(verificationToken)
    .digest('hex');
  
  return verificationToken;
};

// Instance method to create invitation token
userSchema.methods.createInvitationToken = function(companyId) {
  const invitationToken = crypto.randomBytes(32).toString('hex');
  
  const association = this.companyAssociations.find(
    assoc => assoc.companyId.toString() === companyId.toString()
  );
  
  if (association) {
    association.invitationToken = crypto
      .createHash('sha256')
      .update(invitationToken)
      .digest('hex');
    association.invitationExpires = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days
    association.invitationStatus = 'pending';
  }
  
  return invitationToken;
};

// Instance method to check user permissions
userSchema.methods.hasPermission = function(companyId, module, action) {
  const association = this.companyAssociations.find(
    assoc => assoc.companyId.toString() === companyId.toString() && assoc.isActive
  );
  
  if (!association) return false;
  
  // SuperAdmins and CompanyAdmins have all permissions
  if (['SuperAdmin', 'CompanyAdmin'].includes(association.role)) return true;
  
  // Check specific module permissions
  const modulePermission = association.permissions.find(p => p.module === module);
  if (!modulePermission) return false;
  
  return modulePermission.actions.includes(action);
};

// Instance method to get all permissions for a company
userSchema.methods.getPermissionsForCompany = function(companyId) {
  const association = this.companyAssociations.find(
    assoc => assoc.companyId.toString() === companyId.toString() && assoc.isActive
  );
  
  if (!association) return [];
  
  return {
    role: association.role,
    permissions: association.permissions,
    joinedAt: association.joinedAt
  };
};

// Instance method to log activity
userSchema.methods.logActivity = function(action, details = {}, context = {}) {
  const activityEntry = {
    userId: this._id,
    companyId: context.companyId,
    action,
    details,
    timestamp: new Date(),
    ipAddress: context.ipAddress,
    userAgent: context.userAgent,
    location: context.location
  };
  
  // Keep only last 50 activity entries
  this.activityLog.unshift(activityEntry);
  if (this.activityLog.length > 50) {
    this.activityLog = this.activityLog.slice(0, 50);
  }
};

// Instance method to get role for company
userSchema.methods.getRoleForCompany = function(companyId) {
  const association = this.companyAssociations.find(
    assoc => assoc.companyId.toString() === companyId.toString()
  );
  
  return association ? association.role : null;
};

// Static method to find users by company
userSchema.statics.findByCompany = function(companyId, role = null, activeOnly = true) {
  const query = { 'companyAssociations.companyId': companyId };
  if (role) {
    query['companyAssociations.role'] = role;
  }
  if (activeOnly) {
    query['companyAssociations.isActive'] = true;
    query.isActive = true;
  }
  
  return this.find(query)
    .populate('companyAssociations.companyId', 'companyProfile.legalName')
    .select('-authentication.password -authentication.twoFactorSecret -authentication.backupCodes');
};

// Static method to find pending invitations
userSchema.statics.findPendingInvitations = function(companyId) {
  return this.find({
    'companyAssociations.companyId': companyId,
    'companyAssociations.invitationStatus': 'pending',
    'companyAssociations.invitationExpires': { $gt: new Date() }
  }).select('profile.firstName profile.lastName authentication.email companyAssociations');
};

// Activity logging schema
const activityLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
  action: {
    type: String,
    enum: ['LOGIN', 'LOGOUT', 'PROFILE_UPDATE', 'PASSWORD_CHANGE', '2FA_ENABLE', '2FA_DISABLE', 
           'REPORT_CREATE', 'REPORT_UPDATE', 'REPORT_SUBMIT', 'REPORT_APPROVE', 'USER_INVITE'],
    required: true
  },
  details: mongoose.Schema.Types.Mixed,
  timestamp: { type: Date, default: Date.now },
  ipAddress: String,
  userAgent: String,
  location: String
}, { _id: false });

// Add activity logging to user schema
userSchema.add({
  activityLog: [activityLogSchema]
});

// Indexes for performance optimization
userSchema.index({ 'authentication.email': 1 }, { unique: true });
userSchema.index({ 'companyAssociations.companyId': 1, 'companyAssociations.role': 1 });
userSchema.index({ 'authentication.loginAttempts': 1, 'authentication.lockUntil': 1 });
userSchema.index({ 'authentication.lastLogin': -1 });
userSchema.index({ isActive: 1, createdAt: -1 });
userSchema.index({ 'companyAssociations.invitationStatus': 1, 'companyAssociations.invitationExpires': 1 });
userSchema.index({ 'activityLog.timestamp': -1, 'activityLog.action': 1 });

module.exports = mongoose.model('User', userSchema);