import { validationResult } from 'express-validator';
import { sendError } from '../utils/response.js';

// Run after express-validator checks
const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return sendError(res, 422, "Validation failed", errors.array());
  }
  next();
};

export { handleValidation };