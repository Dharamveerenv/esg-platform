/**
 * Standardized API Response Formatter
 * Ensures consistent response structure across all endpoints
 */

class ResponseFormatter {
  /**
   * Success response format
   * @param {Object} res - Express response object
   * @param {Object} data - Response data
   * @param {String} message - Success message (optional)
   * @param {Number} statusCode - HTTP status code (default: 200)
   * @param {Object} meta - Additional metadata (pagination, etc.)
   */
  static success(res, data = null, message = null, statusCode = 200, meta = {}) {
    const response = {
      success: true,
      data,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: res.locals.requestId || null,
        version: 'v1',
        ...meta
      }
    };

    if (message) {
      response.message = message;
    }

    return res.status(statusCode).json(response);
  }

  /**
   * Error response format
   * @param {Object} res - Express response object
   * @param {String} message - Error message
   * @param {Number} statusCode - HTTP status code
   * @param {String} code - Error code
   * @param {Array} details - Detailed error information
   */
  static error(res, message, statusCode = 500, code = 'INTERNAL_ERROR', details = []) {
    const response = {
      success: false,
      error: {
        code,
        message,
        ...(details.length > 0 && { details }),
        context: {
          requestId: res.locals.requestId || null,
          timestamp: new Date().toISOString(),
          path: res.req?.path || null,
          method: res.req?.method || null
        }
      }
    };

    return res.status(statusCode).json(response);
  }

  /**
   * Validation error response
   * @param {Object} res - Express response object
   * @param {Array} validationErrors - Array of validation errors
   */
  static validationError(res, validationErrors) {
    const details = validationErrors.map(err => ({
      field: err.field || err.path,
      code: err.code || 'VALIDATION_ERROR',
      message: err.message,
      value: err.value
    }));

    return this.error(
      res,
      'Validation failed for one or more fields',
      400,
      'VALIDATION_ERROR',
      details
    );
  }

  /**
   * Paginated response format
   * @param {Object} res - Express response object
   * @param {Array} data - Response data array
   * @param {Number} page - Current page
   * @param {Number} limit - Items per page
   * @param {Number} total - Total items count
   * @param {String} message - Success message (optional)
   */
  static paginated(res, data, page, limit, total, message = null) {
    const pages = Math.ceil(total / limit);
    
    const pagination = {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages,
      hasNextPage: page < pages,
      hasPrevPage: page > 1,
      nextPage: page < pages ? page + 1 : null,
      prevPage: page > 1 ? page - 1 : null
    };

    return this.success(res, data, message, 200, { pagination });
  }

  /**
   * Created resource response (201)
   * @param {Object} res - Express response object
   * @param {Object} data - Created resource data
   * @param {String} message - Success message (optional)
   */
  static created(res, data, message = 'Resource created successfully') {
    return this.success(res, data, message, 201);
  }

  /**
   * No content response (204)
   * @param {Object} res - Express response object
   */
  static noContent(res) {
    return res.status(204).send();
  }

  /**
   * Authentication required response (401)
   * @param {Object} res - Express response object
   * @param {String} message - Error message
   */
  static unauthorized(res, message = 'Authentication required') {
    return this.error(res, message, 401, 'UNAUTHORIZED');
  }

  /**
   * Forbidden response (403)
   * @param {Object} res - Express response object
   * @param {String} message - Error message
   */
  static forbidden(res, message = 'Access denied') {
    return this.error(res, message, 403, 'FORBIDDEN');
  }

  /**
   * Not found response (404)
   * @param {Object} res - Express response object
   * @param {String} message - Error message
   */
  static notFound(res, message = 'Resource not found') {
    return this.error(res, message, 404, 'NOT_FOUND');
  }

  /**
   * Conflict response (409)
   * @param {Object} res - Express response object
   * @param {String} message - Error message
   */
  static conflict(res, message = 'Resource conflict') {
    return this.error(res, message, 409, 'CONFLICT');
  }

  /**
   * Rate limit exceeded response (429)
   * @param {Object} res - Express response object
   * @param {String} message - Error message
   */
  static rateLimitExceeded(res, message = 'Rate limit exceeded') {
    return this.error(res, message, 429, 'RATE_LIMIT_EXCEEDED');
  }

  /**
   * Service unavailable response (503)
   * @param {Object} res - Express response object
   * @param {String} message - Error message
   */
  static serviceUnavailable(res, message = 'Service temporarily unavailable') {
    return this.error(res, message, 503, 'SERVICE_UNAVAILABLE');
  }
}

module.exports = ResponseFormatter;