/**
 * VSME ESG Platform - User Model
 * MongoDB Schema with validation and security features
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    validate: {
      validator: function(email) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
      },
      message: 'Please enter a valid email address'
    }
  },
  
  passwordHash: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 8,
    select: false // Don't include in queries by default
  },
  
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
    phone: {
      type: String,
      validate: {
        validator: function(phone) {
          return /^[\+]?[1-9][\d]{0,15}$/.test(phone);
        },
        message: 'Please enter a valid phone number'
      }
    },
    department: {
      type: String,
      enum: ['Management', 'Sustainability', 'Operations', 'Finance', 'HR', 'Other'],
      default: 'Other'
    }
  },
  
  companyAssociations: [{
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: true
    },
    role: {
      type: String,
      enum: ['Admin', 'Manager', 'Editor', 'Viewer'],
      required: true
    },
    permissions: [{
      type: String,
      enum: [
        'B3_EMISSIONS_READ', 'B3_EMISSIONS_WRITE', 'B3_EMISSIONS_CALCULATE',
        'B8_WORKFORCE_READ', 'B8_WORKFORCE_WRITE',
        'REPORT_APPROVE', 'REPORT_PUBLISH',
        'COMPANY_MANAGE', 'USER_MANAGE', 'AUDIT_VIEW'
      ]
    }],
    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    assignedDate: {
      type: Date,
      default: Date.now
    }
  }],
  
  preferences: {
    language: {
      type: String,
      enum: ['en', 'es', 'fr', 'de', 'it'],
      default: 'en'
    },
    timezone: {
      type: String,
      default: 'Europe/Dublin'
    },
    currency: {
      type: String,
      enum: ['EUR', 'USD', 'GBP'],
      default: 'EUR'
    },
    notifications: {
      email: {
        type: Boolean,
        default: true
      },
      dashboard: {
        type: Boolean,
        default: true
      },
      reports: {
        type: Boolean,
        default: true
      }
    }
  },
  
  security: {
    mfaEnabled: {
      type: Boolean,
      default: false
    },
    mfaSecret: {
      type: String,
      select: false
    },
    mfaBackupCodes: [{
      code: String,
      used: {
        type: Boolean,
        default: false
      }
    }],
    lastPasswordChange: {
      type: Date,
      default: Date.now
    },
    failedLoginAttempts: {
      type: Number,
      default: 0
    },
    accountLocked: {
      type: Boolean,
      default: false
    },
    lockExpires: Date,
    passwordResetToken: String,
    passwordResetExpires: Date
  },
  
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for performance optimization
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ 'companyAssociations.companyId': 1, 'companyAssociations.role': 1 });
userSchema.index({ 'security.failedLoginAttempts': 1, 'security.accountLocked': 1 });
userSchema.index({ lastLogin: -1 });
userSchema.index({ isActive: 1, createdAt: -1 });

// Virtual for full name
userSchema.virtual('fullName').get(function() {
  return `${this.profile.firstName} ${this.profile.lastName}`;
});

// Pre-save middleware to hash password
userSchema.pre('save', async function(next) {
  if (!this.isModified('passwordHash')) return next();
  
  // Hash password with cost of 12
  this.passwordHash = await bcrypt.hash(this.passwordHash, 12);
  next();
});

// Instance method to check password
userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// Instance method to check if password changed after JWT was issued
userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if (this.security.lastPasswordChange) {
    const changedTimestamp = parseInt(
      this.security.lastPasswordChange.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

// Instance method to create password reset token
userSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');
  
  this.security.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  
  this.security.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
  
  return resetToken;
};

// Instance method to check user permissions
userSchema.methods.hasPermission = function(companyId, permission) {
  const association = this.companyAssociations.find(
    assoc => assoc.companyId.toString() === companyId.toString()
  );
  
  if (!association) return false;
  
  // Admins have all permissions
  if (association.role === 'Admin') return true;
  
  return association.permissions.includes(permission);
};

// Instance method to get role for company
userSchema.methods.getRoleForCompany = function(companyId) {
  const association = this.companyAssociations.find(
    assoc => assoc.companyId.toString() === companyId.toString()
  );
  
  return association ? association.role : null;
};

// Static method to find users by company
userSchema.statics.findByCompany = function(companyId, role = null) {
  const query = { 'companyAssociations.companyId': companyId };
  if (role) {
    query['companyAssociations.role'] = role;
  }
  
  return this.find(query).populate('companyAssociations.companyId', 'companyProfile.legalName');
};

module.exports = mongoose.model('User', userSchema);