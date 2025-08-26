/**
 * Request Tracking Middleware
 * Adds unique request ID for response tracking and logging
 */

const crypto = require('crypto');

/**
 * Generate unique request ID
 * @returns {String} Unique request identifier
 */
const generateRequestId = () => {
  return `req_${crypto.randomBytes(8).toString('hex')}_${Date.now()}`;
};

/**
 * Request tracking middleware
 * Adds requestId to res.locals for use in responses
 */
const requestTracking = (req, res, next) => {
  // Generate unique request ID
  const requestId = generateRequestId();
  
  // Store in response locals for access in controllers
  res.locals.requestId = requestId;
  
  // Add to request headers for logging
  req.headers['x-request-id'] = requestId;
  
  // Add request start time for performance tracking
  res.locals.requestStartTime = Date.now();
  
  // Log request details (can be enhanced with proper logging library)
  console.log(`[${new Date().toISOString()}] ${requestId} ${req.method} ${req.originalUrl}`);
  
  next();
};

module.exports = requestTracking;