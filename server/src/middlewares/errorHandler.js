export {}
import { HTTP_STATUS } from '../utils/constants.js';

/**
 * Handles requests to routes that don't exist.
 * Should be mounted after all valid routes, before errorHandler.
 */
export const notFoundHandler = (req, res, next) => {
  const error = new Error(`Route not found - ${req.originalUrl}`);
  error.statusCode = HTTP_STATUS.NOT_FOUND;
  next(error);
};

/**
 * Global error handler. Catches errors passed via next(error)
 * from any route/controller/service, and formats a consistent
 * JSON error response.
 *
 * Must be registered LAST in the middleware chain (4 params
 * signals Express this is an error-handling middleware).
 */
// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
  let message = err.message || 'Internal Server Error';

  // Mongoose bad ObjectId
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = HTTP_STATUS.BAD_REQUEST;
    message = `Invalid resource ID: ${err.value}`;
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    statusCode = HTTP_STATUS.UNPROCESSABLE_ENTITY;
    message = Object.values(err.errors)
      .map((e) => e.message)
      .join(', ');
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    statusCode = HTTP_STATUS.CONFLICT;
    const field = Object.keys(err.keyValue || {})[0];
    message = field
      ? `Duplicate value for field: ${field}`
      : 'Duplicate field value';
  }

  // JWT errors (relevant once Auth module is added)
  if (err.name === 'JsonWebTokenError') {
    statusCode = HTTP_STATUS.UNAUTHORIZED;
    message = 'Invalid token';
  }
  if (err.name === 'TokenExpiredError') {
    statusCode = HTTP_STATUS.UNAUTHORIZED;
    message = 'Token expired';
  }

  console.error(`[Error] ${req.method} ${req.originalUrl} -> ${statusCode}: ${message}`);
  if (process.env.NODE_ENV !== 'production' && err.stack) {
    console.error(err.stack);
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
  });
};