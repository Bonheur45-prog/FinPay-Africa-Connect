import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import requestLogger from './middleware/logger.js';
import authRoutes from './routes/auth.js';
import blogRoutes from './routes/blogs.js';
import { errorHandler } from './middleware/errorHandler.js';
import { sendError } from './utils/response.js';

const app = express();

// ─── Security ─────────────────────────────────────────────
app.use(helmet());

app.use(
  cors({
    origin: process.env.FRONTEND_URL
      ? process.env.FRONTEND_URL.split(',')
      : ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true,
  })
);

// Global rate limiter — 100 requests per 15 minutes per IP
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests. Please try again later.' },
});

// Stricter limiter for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many login attempts. Please try again in 15 minutes.' },
});

app.use(globalLimiter);

// ─── Body Parsing ──────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ─── Compression ───────────────────────────────────────────
app.use(compression());

// ─── Request Logging ───────────────────────────────────────
app.use(requestLogger);

// ─── Health Check ──────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'FinPay API is running.', timestamp: new Date().toISOString() });
});

// ─── Routes ────────────────────────────────────────────────
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/blogs', blogRoutes);

// ─── 404 Handler ───────────────────────────────────────────
app.use((req, res) => {
  sendError(res, 404, `Route ${req.originalUrl} not found.`);
});

// ─── Global Error Handler ──────────────────────────────────
app.use(errorHandler);

export default app;