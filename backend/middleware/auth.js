/**
 * Authentication and Authorization Middleware
 * JWT-based authentication with role-based access control
 */

const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../models/User');
const { AuthenticationError, AuthorizationError } = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

/**
 * Generate JWT token
 */
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

/**
 * Generate refresh token
 */
const signRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
  });
};

/**
 * Send JWT token response
 */
const createSendToken = (user, statusCode, req, res, message = 'Success') => {
  const token = signToken(user._id);
  const refreshToken = signRefreshToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + (24 * 60 * 60 * 1000) // 24 hours
    ),
    httpOnly: true,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
    sameSite: 'lax'
  };

  res.cookie('jwt', token, cookieOptions);
  res.cookie('refreshToken', refreshToken, {
    ...cookieOptions,
    expires: new Date(Date.now() + (7 * 24 * 60 * 60 * 1000)) // 7 days
  });

  // Remove password from output
  user.passwordHash = undefined;
  user.security = undefined;

  res.status(statusCode).json({
    status: 'success',
    message,
    token,
    refreshToken,
    data: {
      user: {
        id: user._id,
        email: user.email,
        profile: user.profile,
        companyAssociations: user.companyAssociations,
        preferences: user.preferences,
        lastLogin: user.lastLogin
      }
    }
  });
};

/**
 * Protect middleware - Check if user is authenticated
 */
const protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check if it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AuthenticationError('You are not logged in! Please log in to get access.')
    );
  }

  // 2) Verification token
  let decoded;
  try {
    decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return next(new AuthenticationError('Your token has expired! Please log in again.'));
    } else if (error.name === 'JsonWebTokenError') {
      return next(new AuthenticationError('Invalid token. Please log in again!'));
    }
    return next(error);
  }

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id).select('+isActive');
  if (!currentUser) {
    return next(
      new AuthenticationError('The user belonging to this token no longer exists.')
    );
  }

  // 4) Check if user account is active
  if (!currentUser.isActive) {
    return next(
      new AuthenticationError('Your account has been deactivated. Please contact support.')
    );
  }

  // 5) Check if user is locked
  if (currentUser.security.accountLocked) {
    return next(
      new AuthenticationError('Your account has been locked due to too many failed login attempts.')
    );
  }

  // 6) Check if password changed after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AuthenticationError('User recently changed password! Please log in again.')
    );
  }

  // Grant access to protected route
  req.user = currentUser;
  next();
});

/**
 * Authorization middleware - Check if user has required role
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new AuthenticationError('Please log in first.'));
    }

    // Get company ID from request params or body
    const companyId = req.params.companyId || 
                     req.params.id || 
                     req.body.companyId ||
                     req.query.companyId;

    if (!companyId) {
      return next(new AuthorizationError('Company ID is required for this operation.'));
    }

    // Check if user has role for this company
    const userRole = req.user.getRoleForCompany(companyId);
    
    if (!userRole) {
      return next(
        new AuthorizationError('You do not have access to this company.')
      );
    }

    if (!roles.includes(userRole)) {
      return next(
        new AuthorizationError(`You need ${roles.join(' or ')} role to perform this action.`)
      );
    }

    // Add role to request for controllers
    req.userRole = userRole;
    req.companyId = companyId;
    
    next();
  };
};

/**
 * Permission-based authorization middleware
 */
const requirePermission = (permission) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new AuthenticationError('Please log in first.'));
    }

    const companyId = req.params.companyId || 
                     req.params.id || 
                     req.body.companyId ||
                     req.query.companyId;

    if (!companyId) {
      return next(new AuthorizationError('Company ID is required for this operation.'));
    }

    const hasPermission = req.user.hasPermissionForCompany(companyId, permission);
    
    if (!hasPermission) {
      return next(
        new AuthorizationError(`You need ${permission} permission to perform this action.`)
      );
    }

    req.companyId = companyId;
    next();
  };
};

/**
 * Optional authentication - doesn't fail if not authenticated
 */
const optionalAuth = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (token) {
    try {
      const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
      const currentUser = await User.findById(decoded.id).select('+isActive');
      
      if (currentUser && currentUser.isActive && !currentUser.security.accountLocked) {
        req.user = currentUser;
      }
    } catch (error) {
      // Continue without user - don't throw error
      console.log('Optional auth failed:', error.message);
    }
  }

  next();
});

/**
 * Refresh token middleware
 */
const refreshToken = catchAsync(async (req, res, next) => {
  // 1) Get refresh token
  let refreshToken;
  if (req.body.refreshToken) {
    refreshToken = req.body.refreshToken;
  } else if (req.cookies.refreshToken) {
    refreshToken = req.cookies.refreshToken;
  }

  if (!refreshToken) {
    return next(
      new AuthenticationError('No refresh token provided')
    );
  }

  // 2) Verify refresh token
  let decoded;
  try {
    decoded = await promisify(jwt.verify)(refreshToken, process.env.JWT_REFRESH_SECRET);
  } catch (error) {
    return next(new AuthenticationError('Invalid or expired refresh token'));
  }

  // 3) Check if user still exists
  const user = await User.findById(decoded.id);
  if (!user || !user.isActive) {
    return next(new AuthenticationError('User no longer exists or is inactive'));
  }

  // 4) Generate new tokens
  createSendToken(user, 200, req, res, 'Token refreshed successfully');
});

/**
 * Admin only middleware
 */
const adminOnly = (req, res, next) => {
  if (!req.user) {
    return next(new AuthenticationError('Please log in first.'));
  }

  // Check if user is a system admin or has admin role for any company
  const hasAdminRole = req.user.companyAssociations.some(
    association => association.role === 'Admin'
  );

  if (!hasAdminRole) {
    return next(
      new AuthorizationError('Admin access required.')
    );
  }

  next();
};

/**
 * Rate limiting based on user
 */
const userRateLimit = (maxRequests = 100, windowMs = 15 * 60 * 1000) => {
  const requests = new Map();

  return (req, res, next) => {
    const userId = req.user ? req.user._id.toString() : req.ip;
    const now = Date.now();
    const windowStart = now - windowMs;

    // Clean old entries
    if (requests.has(userId)) {
      requests.set(
        userId,
        requests.get(userId).filter(time => time > windowStart)
      );
    } else {
      requests.set(userId, []);
    }

    // Check rate limit
    const userRequests = requests.get(userId);
    if (userRequests.length >= maxRequests) {
      return next(
        new AuthenticationError(`Rate limit exceeded. Max ${maxRequests} requests per ${windowMs / 60000} minutes.`)
      );
    }

    // Add current request
    userRequests.push(now);

    next();
  };
};

module.exports = {
  signToken,
  signRefreshToken,
  createSendToken,
  protect,
  authorize,
  requirePermission,
  optionalAuth,
  refreshToken,
  adminOnly,
  userRateLimit
};