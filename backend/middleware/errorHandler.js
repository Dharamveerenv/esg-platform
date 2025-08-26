/**
 * Global Error Handling Middleware
 * Handles all types of errors and provides consistent error responses
 */

const { AppError } = require('../utils/appError');
const ResponseFormatter = require('../utils/responseFormatter');

// Handle different types of database errors
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400, 'CAST_ERROR');
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.message.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400, 'DUPLICATE_FIELD');
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map(el => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400, 'VALIDATION_ERROR', { validationErrors: errors });
};

const handleJWTError = () =>
  new AppError('Invalid token. Please log in again!', 401, 'INVALID_JWT');

const handleJWTExpiredError = () =>
  new AppError('Your token has expired! Please log in again.', 401, 'EXPIRED_JWT');

// Send error response in development
const sendErrorDev = (err, req, res) => {
  // For API requests
  if (req.originalUrl.startsWith('/api')) {
    const details = [];
    
    // Add validation errors if present
    if (err.details && err.details.validationErrors) {
      details.push(...err.details.validationErrors.map(e => ({
        field: e,
        code: 'VALIDATION_ERROR',
        message: e
      })));
    }
    
    // Add stack trace in development
    if (err.stack) {
      details.push({
        field: 'stack',
        code: 'DEBUG_INFO',
        message: err.stack
      });
    }
    
    return ResponseFormatter.error(
      res,
      err.message,
      err.statusCode,
      err.errorCode || 'UNKNOWN_ERROR',
      details
    );
  }
  
  // For non-API requests
  console.error('ERROR 💥', err);
  return res.status(err.statusCode).json({
    title: 'Something went wrong!',
    msg: err.message
  });
};

// Send error response in production
const sendErrorProd = (err, req, res) => {
  // For API requests
  if (req.originalUrl.startsWith('/api')) {
    // Operational, trusted error: send message to client
    if (err.isOperational) {
      const details = [];
      
      // Add validation errors if present (safe for production)
      if (err.details && err.details.validationErrors) {
        details.push(...err.details.validationErrors.map(e => ({
          field: e,
          code: 'VALIDATION_ERROR',
          message: e
        })));
      }
      
      return ResponseFormatter.error(
        res,
        err.message,
        err.statusCode,
        err.errorCode,
        details
      );
    }
    
    // Programming or other unknown error: don't leak error details
    console.error('ERROR 💥', err);
    return ResponseFormatter.error(
      res,
      'Something went wrong!',
      500,
      'INTERNAL_SERVER_ERROR'
    );
  }
  
  // For non-API requests
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      title: 'Something went wrong!',
      msg: err.message
    });
  }
  
  console.error('ERROR 💥', err);
  return res.status(err.statusCode).json({
    title: 'Something went wrong!',
    msg: 'Please try again later.'
  });
};

// Handle specific ESG calculation errors
const handleCalculationError = (err) => {
  let message = 'Calculation failed';
  
  if (err.message.includes('emission factor')) {
    message = 'Required emission factor not found. Please check fuel type and country selection.';
  } else if (err.message.includes('division by zero')) {
    message = 'Invalid calculation input: division by zero detected.';
  } else if (err.message.includes('negative value')) {
    message = 'Invalid input: negative values not allowed for emissions calculations.';
  }
  
  return new AppError(message, 422, 'CALCULATION_ERROR', {
    originalError: err.message
  });
};

// Handle MongoDB connection errors
const handleMongoError = (err) => {
  if (err.code === 'ETIMEDOUT') {
    return new AppError('Database connection timeout. Please try again.', 503, 'DB_TIMEOUT');
  }
  
  if (err.code === 'ENOTFOUND') {
    return new AppError('Database server not found. Please check configuration.', 503, 'DB_NOT_FOUND');
  }
  
  return new AppError('Database connection error. Please try again later.', 503, 'DB_CONNECTION_ERROR');
};

// Main error handling middleware
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  err.timestamp = err.timestamp || new Date().toISOString();

  // Log error for monitoring
  if (err.statusCode >= 500) {
    console.error('🚨 Server Error:', {
      message: err.message,
      statusCode: err.statusCode,
      errorCode: err.errorCode,
      url: req.originalUrl,
      method: req.method,
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      timestamp: err.timestamp,
      stack: err.stack
    });
  } else if (err.statusCode >= 400) {
    console.warn('⚠️ Client Error:', {
      message: err.message,
      statusCode: err.statusCode,
      errorCode: err.errorCode,
      url: req.originalUrl,
      method: req.method,
      ip: req.ip
    });
  }

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else {
    let error = { ...err };
    error.message = err.message;

    // Handle specific error types
    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError') error = handleValidationErrorDB(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();
    if (error.name === 'CalculationError') error = handleCalculationError(error);
    if (error.name === 'MongoError') error = handleMongoError(error);

    sendErrorProd(error, req, res);
  }
};