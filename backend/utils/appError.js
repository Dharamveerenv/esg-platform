/**
 * Custom Error Class for Application-Specific Errors
 * Extends the native Error class with additional properties
 */

class AppError extends Error {
  constructor(message, statusCode, errorCode = null, details = null) {
    super(message);
    
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    this.errorCode = errorCode;
    this.details = details;
    this.timestamp = new Date().toISOString();
    
    Error.captureStackTrace(this, this.constructor);
  }
}

// Predefined error types for common ESG platform scenarios
class ValidationError extends AppError {
  constructor(message, details = null) {
    super(message, 400, 'VALIDATION_ERROR', details);
  }
}

class AuthenticationError extends AppError {
  constructor(message = 'Authentication failed') {
    super(message, 401, 'AUTHENTICATION_ERROR');
  }
}

class AuthorizationError extends AppError {
  constructor(message = 'Not authorized to access this resource') {
    super(message, 403, 'AUTHORIZATION_ERROR');
  }
}

class NotFoundError extends AppError {
  constructor(resource = 'Resource') {
    super(`${resource} not found`, 404, 'NOT_FOUND_ERROR');
  }
}

class ConflictError extends AppError {
  constructor(message, details = null) {
    super(message, 409, 'CONFLICT_ERROR', details);
  }
}

class CalculationError extends AppError {
  constructor(message, calculationType = null, details = null) {
    super(`Calculation error: ${message}`, 422, 'CALCULATION_ERROR', {
      calculationType,
      ...details
    });
  }
}

class ComplianceError extends AppError {
  constructor(message, complianceType = null, details = null) {
    super(`Compliance error: ${message}`, 422, 'COMPLIANCE_ERROR', {
      complianceType,
      ...details
    });
  }
}

class DataIntegrityError extends AppError {
  constructor(message, field = null, details = null) {
    super(`Data integrity error: ${message}`, 422, 'DATA_INTEGRITY_ERROR', {
      field,
      ...details
    });
  }
}

class RateLimitError extends AppError {
  constructor(message = 'Too many requests') {
    super(message, 429, 'RATE_LIMIT_ERROR');
  }
}

class ExternalAPIError extends AppError {
  constructor(message, service = null, details = null) {
    super(`External API error: ${message}`, 502, 'EXTERNAL_API_ERROR', {
      service,
      ...details
    });
  }
}

module.exports = {
  AppError,
  ValidationError,
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  ConflictError,
  CalculationError,
  ComplianceError,
  DataIntegrityError,
  RateLimitError,
  ExternalAPIError
};