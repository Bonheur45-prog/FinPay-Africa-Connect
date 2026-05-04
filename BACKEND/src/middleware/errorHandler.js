import { sendError } from '../utils/response.js';

export const errorHandler = (err, req, res, next) => {
  console.error('Unhandled error:', err);

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return sendError(res, 409, `${field} already exists.`);
  }

  // Mongoose cast error (invalid ObjectId)
  if (err.name === 'CastError') {
    return sendError(res, 400, 'Invalid ID format.');
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message).join(', ');
    return sendError(res, 400, message);
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return sendError(res, 401, 'Invalid token.');
  }

  if (err.name === 'TokenExpiredError') {
    return sendError(res, 401, 'Token has expired. Please log in again.');
  }

  return sendError(res, err.statusCode || 500, err.message || 'Internal server error.');
};