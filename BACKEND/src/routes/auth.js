import express from 'express';
import { body } from 'express-validator';
import { authenticate } from '../middleware/auth.js';
import { handleValidation } from '../middleware/validate.middleware.js';
import { login, register, getMe, logout } from '../controllers/auth.controller.js';

const router = express.Router();

router.post(
  '/login',
  [
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required.'),
    body('password').notEmpty().withMessage('Password is required.'),
    handleValidation
  ],
  login
);

router.post(
  '/register',
  [
    body('username').isLength({ min: 3 }).trim().escape().withMessage('Username must be at least 3 characters.'),
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required.'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters.'),
    handleValidation
  ],
  register
);

router.get('/me', authenticate, getMe);
router.post('/logout', authenticate, logout);

export default router;