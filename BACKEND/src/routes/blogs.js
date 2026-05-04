import express from 'express';
import { body } from 'express-validator';
import multer from 'multer';
import { authenticate, authorize, optionalAuth } from '../middleware/auth.js';
import { handleValidation } from '../middleware/validate.middleware.js';
import {
  listBlogs,
  getBlogCategories,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
  uploadCoverImage,
  uploadBlogImages,
  deleteBlogImage
} from '../controllers/blog.controller.js';

const router = express.Router();

// Multer configuration for memory storage
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

const blogValidation = [
  body('title.en').trim().isLength({ min: 1 }).withMessage('English title is required'),
  body('title.fr').trim().isLength({ min: 1 }).withMessage('French title is required'),
  body('description.en').trim().isLength({ min: 10 }).withMessage('English description must be at least 10 characters'),
  body('description.fr').trim().isLength({ min: 10 }).withMessage('French description must be at least 10 characters'),
  body('content.en').trim().isLength({ min: 50 }).withMessage('English content must be at least 50 characters'),
  body('content.fr').trim().isLength({ min: 50 }).withMessage('French content must be at least 50 characters'),
  body('excerpt.en').trim().isLength({ min: 10 }).withMessage('English excerpt is required'),
  body('excerpt.fr').trim().isLength({ min: 10 }).withMessage('French excerpt is required'),
  body('category').isIn(['product', 'engineering', 'growth', 'security', 'design', 'culture']).withMessage('Invalid category'),
  body('status').optional().isIn(['draft', 'published', 'archived']).withMessage('Invalid status')
];

router.get('/', optionalAuth, listBlogs);
router.get('/categories', getBlogCategories);
router.get('/:slug', optionalAuth, getBlogBySlug);
router.post(
  '/',
  authenticate,
  authorize('admin'),
  [
    ...blogValidation,
    body('slug').trim().isLength({ min: 1 }).withMessage('Slug is required'),
    handleValidation
  ],
  createBlog
);
router.put('/:id', authenticate, authorize('admin'), blogValidation, handleValidation, updateBlog);
router.delete('/:id', authenticate, authorize('admin'), deleteBlog);
router.post('/:id/upload-cover', authenticate, authorize('admin'), upload.single('image'), uploadCoverImage);
router.post('/:id/upload-images', authenticate, authorize('admin'), upload.array('images', 5), uploadBlogImages);
router.delete('/:id/images/:imageIndex', authenticate, authorize('admin'), deleteBlogImage);

export default router;