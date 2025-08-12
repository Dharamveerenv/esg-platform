/**
 * VSME ESG Platform - Authentication Controller
 * Handles user authentication, authorization, and security features
 */

const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const speakeasy = require('speakeasy');
const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Email = require('../utils/email');

// Generate JWT token
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '15m'
  });
};

// Generate refresh token
const signRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d'
  });
};

// Create and send JWT tokens
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const refreshToken = signRefreshToken(user._id);
  
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  };

  res.cookie('jwt', token, cookieOptions);
  res.cookie('refreshToken', refreshToken, {
    ...cookieOptions,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
  });

  // Remove password from output
  user.passwordHash = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    refreshToken,
    data: {
      user
    }
  });
};

// User registration
exports.signup = catchAsync(async (req, res, next) => {
  const { email, password, firstName, lastName, position, department, companyId, invitationToken } = req.body;

  // Validate invitation token if provided
  if (invitationToken) {
    // Invitation validation logic would be implemented here
    // For now, we'll skip this step
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new AppError('User already exists with this email address', 400));
  }

  // Create new user
  const newUser = await User.create({
    email,
    passwordHash: password,
    profile: {
      firstName,
      lastName,
      position,
      department
    },
    companyAssociations: companyId ? [{
      companyId,
      role: 'Editor', // Default role for new users
      permissions: ['B3_EMISSIONS_READ', 'B3_EMISSIONS_WRITE', 'B8_WORKFORCE_READ', 'B8_WORKFORCE_WRITE']
    }] : []
  });

  // Send welcome email
  try {
    await new Email(newUser).sendWelcome();
  } catch (err) {
    console.log('Error sending welcome email:', err.message);
    // Don't fail registration if email fails
  }

  createSendToken(newUser, 201, res);
});

// User login
exports.login = catchAsync(async (req, res, next) => {
  const { email, password, mfaToken } = req.body;

  // Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  // Check if user exists and password is correct
  const user = await User.findOne({ email }).select('+passwordHash +security');

  if (!user || !(await user.correctPassword(password, user.passwordHash))) {
    // Increment failed login attempts
    if (user) {
      user.security.failedLoginAttempts += 1;
      
      // Lock account after 5 failed attempts
      if (user.security.failedLoginAttempts >= 5) {
        user.security.accountLocked = true;
        user.security.lockExpires = Date.now() + 30 * 60 * 1000; // 30 minutes
        await user.save({ validateBeforeSave: false });
        
        return next(new AppError('Account locked due to too many failed login attempts. Try again in 30 minutes.', 423));
      }
      
      await user.save({ validateBeforeSave: false });
    }
    
    return next(new AppError('Incorrect email or password', 401));
  }

  // Check if account is locked
  if (user.security.accountLocked) {
    if (user.security.lockExpires && user.security.lockExpires > Date.now()) {
      return next(new AppError('Account is temporarily locked. Please try again later.', 423));
    } else {
      // Unlock account if lock period has expired
      user.security.accountLocked = false;
      user.security.lockExpires = undefined;
      user.security.failedLoginAttempts = 0;
    }
  }

  // Check if account is active
  if (!user.isActive) {
    return next(new AppError('Your account has been deactivated. Please contact support.', 403));
  }

  // Check MFA if enabled
  if (user.security.mfaEnabled) {
    if (!mfaToken) {
      return res.status(200).json({
        status: 'mfa_required',
        message: 'Multi-factor authentication required',
        mfaEnabled: true
      });
    }

    const verified = speakeasy.totp.verify({
      secret: user.security.mfaSecret,
      encoding: 'base32',
      token: mfaToken,
      window: 2
    });

    if (!verified) {
      user.security.failedLoginAttempts += 1;
      await user.save({ validateBeforeSave: false });
      return next(new AppError('Invalid MFA token', 401));
    }
  }

  // Reset failed login attempts on successful login
  user.security.failedLoginAttempts = 0;
  user.lastLogin = new Date();
  await user.save({ validateBeforeSave: false });

  createSendToken(user, 200, res);
});

// User logout
exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });
  res.cookie('refreshToken', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });
  
  res.status(200).json({ status: 'success' });
};

// Protect middleware
exports.protect = catchAsync(async (req, res, next) => {
  // Get token and check if it exists
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(new AppError('You are not logged in! Please log in to get access.', 401));
  }

  // Verify token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(new AppError('The user belonging to this token does no longer exist.', 401));
  }

  // Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(new AppError('User recently changed password! Please log in again.', 401));
  }

  // Check if account is active
  if (!currentUser.isActive) {
    return next(new AppError('Your account has been deactivated. Please contact support.', 403));
  }

  // Grant access to protected route
  req.user = currentUser;
  next();
});

// Restrict to specific roles
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError('You do not have permission to perform this action', 403));
    }
    next();
  };
};

// Check company access
exports.checkCompanyAccess = (req, res, next) => {
  const companyId = req.params.companyId || req.body.companyId;
  
  if (!companyId) {
    return next(new AppError('Company ID is required', 400));
  }

  const hasAccess = req.user.companyAssociations.some(
    assoc => assoc.companyId.toString() === companyId.toString()
  );

  if (!hasAccess) {
    return next(new AppError('You do not have access to this company', 403));
  }

  // Add company role to request
  const association = req.user.companyAssociations.find(
    assoc => assoc.companyId.toString() === companyId.toString()
  );
  req.companyRole = association.role;
  req.companyPermissions = association.permissions;

  next();
};

// Check specific permission
exports.checkPermission = (permission) => {
  return (req, res, next) => {
    const companyId = req.params.companyId || req.body.companyId;
    
    if (!req.user.hasPermission(companyId, permission)) {
      return next(new AppError(`You do not have permission: ${permission}`, 403));
    }
    
    next();
  };
};

// Forgot password
exports.forgotPassword = catchAsync(async (req, res, next) => {
  // Get user based on posted email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('There is no user with that email address.', 404));
  }

  // Generate random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // Send reset token to user's email
  try {
    const resetURL = `${req.protocol}://${req.get('host')}/api/auth/reset-password/${resetToken}`;

    await new Email(user, resetURL).sendPasswordReset();

    res.status(200).json({
      status: 'success',
      message: 'Password reset token sent to email!'
    });
  } catch (err) {
    user.security.passwordResetToken = undefined;
    user.security.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new AppError('There was an error sending the email. Try again later!', 500));
  }
});

// Reset password
exports.resetPassword = catchAsync(async (req, res, next) => {
  // Get user based on the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    'security.passwordResetToken': hashedToken,
    'security.passwordResetExpires': { $gt: Date.now() }
  });

  // If token has not expired, and there is user, set the new password
  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }

  user.passwordHash = req.body.password;
  user.security.passwordResetToken = undefined;
  user.security.passwordResetExpires = undefined;
  user.security.lastPasswordChange = new Date();
  await user.save();

  // Log the user in, send JWT
  createSendToken(user, 200, res);
});

// Update password
exports.updatePassword = catchAsync(async (req, res, next) => {
  // Get user from collection
  const user = await User.findById(req.user.id).select('+passwordHash');

  // Check if posted current password is correct
  if (!(await user.correctPassword(req.body.passwordCurrent, user.passwordHash))) {
    return next(new AppError('Your current password is incorrect.', 401));
  }

  // Update password
  user.passwordHash = req.body.password;
  user.security.lastPasswordChange = new Date();
  await user.save();

  // Log user in, send JWT
  createSendToken(user, 200, res);
});

// Setup MFA
exports.setupMFA = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+security');

  if (user.security.mfaEnabled) {
    return next(new AppError('MFA is already enabled for this account', 400));
  }

  const secret = speakeasy.generateSecret({
    name: `VSME ESG Platform (${user.email})`,
    issuer: 'VSME ESG'
  });

  // Generate backup codes
  const backupCodes = [];
  for (let i = 0; i < 10; i++) {
    backupCodes.push({
      code: crypto.randomBytes(4).toString('hex').toUpperCase(),
      used: false
    });
  }

  // Save MFA secret (not enabled yet)
  user.security.mfaSecret = secret.base32;
  user.security.mfaBackupCodes = backupCodes;
  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    status: 'success',
    data: {
      secret: secret.base32,
      qrCodeUrl: secret.otpauth_url,
      backupCodes: backupCodes.map(bc => bc.code)
    }
  });
});

// Enable MFA
exports.enableMFA = catchAsync(async (req, res, next) => {
  const { mfaToken } = req.body;
  const user = await User.findById(req.user.id).select('+security');

  if (!user.security.mfaSecret) {
    return next(new AppError('MFA setup not initiated. Please setup MFA first.', 400));
  }

  if (user.security.mfaEnabled) {
    return next(new AppError('MFA is already enabled for this account', 400));
  }

  // Verify the token
  const verified = speakeasy.totp.verify({
    secret: user.security.mfaSecret,
    encoding: 'base32',
    token: mfaToken,
    window: 2
  });

  if (!verified) {
    return next(new AppError('Invalid MFA token', 400));
  }

  // Enable MFA
  user.security.mfaEnabled = true;
  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    status: 'success',
    message: 'MFA successfully enabled'
  });
});

// Disable MFA
exports.disableMFA = catchAsync(async (req, res, next) => {
  const { mfaToken, password } = req.body;
  const user = await User.findById(req.user.id).select('+passwordHash +security');

  if (!user.security.mfaEnabled) {
    return next(new AppError('MFA is not enabled for this account', 400));
  }

  // Verify password
  if (!(await user.correctPassword(password, user.passwordHash))) {
    return next(new AppError('Incorrect password', 401));
  }

  // Verify MFA token
  const verified = speakeasy.totp.verify({
    secret: user.security.mfaSecret,
    encoding: 'base32',
    token: mfaToken,
    window: 2
  });

  if (!verified) {
    return next(new AppError('Invalid MFA token', 400));
  }

  // Disable MFA
  user.security.mfaEnabled = false;
  user.security.mfaSecret = undefined;
  user.security.mfaBackupCodes = [];
  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    status: 'success',
    message: 'MFA successfully disabled'
  });
});

// Refresh token
exports.refreshToken = catchAsync(async (req, res, next) => {
  let refreshToken;
  
  if (req.body.refreshToken) {
    refreshToken = req.body.refreshToken;
  } else if (req.cookies.refreshToken) {
    refreshToken = req.cookies.refreshToken;
  }

  if (!refreshToken) {
    return next(new AppError('Refresh token not provided', 401));
  }

  // Verify refresh token
  const decoded = await promisify(jwt.verify)(refreshToken, process.env.JWT_REFRESH_SECRET);

  // Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(new AppError('The user belonging to this token does no longer exist.', 401));
  }

  // Check if user is active
  if (!currentUser.isActive) {
    return next(new AppError('Your account has been deactivated.', 403));
  }

  // Generate new tokens
  createSendToken(currentUser, 200, res);
});

// Get current user profile
exports.getProfile = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).populate('companyAssociations.companyId', 'companyProfile.legalName');

  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  });
});

// Update current user profile
exports.updateProfile = catchAsync(async (req, res, next) => {
  // Filter allowed fields
  const allowedFields = ['profile', 'preferences'];
  const updates = {};
  
  Object.keys(req.body).forEach(key => {
    if (allowedFields.includes(key)) {
      updates[key] = req.body[key];
    }
  });

  const user = await User.findByIdAndUpdate(req.user.id, updates, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  });
});