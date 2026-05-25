import dns from 'node:dns';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
dns.setServers(['8.8.8.8', '8.8.4.4']);

// ─── Load Environment Variables FIRST ──────────────────────
const envPath = fileURLToPath(new URL('.env', import.meta.url));
const result = dotenv.config({ path: envPath });

if (result.error) {
  console.error('[loadEnv] Failed to load .env:', result.error);
}

// ─── Import Express & Middleware AFTER env is loaded ────────
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import requestLogger from './src/middleware/logger.js';
import authRoutes from './src/routes/auth.js';
import blogRoutes from './src/routes/blogs.js';
import { errorHandler } from './src/middleware/errorHandler.js';
import { sendError } from './src/utils/response.js';
import connectDB from './src/config/database.js';
import { validateCloudinaryConfig } from './src/config/cloudinary.js';

// ─── Initialize Express App ───────────────────────────────
const app = express();

// ─── Security ─────────────────────────────────────────────
app.use(helmet());

app.use(
  cors({
    origin: process.env.FRONTEND_URL
      ? process.env.FRONTEND_URL.split(',')
      : ['https://finpay-africa-connect.onrender.com', "https://admin-dashboard-z398.onrender.com", 'http://localhost:5173', 'http://localhost:3000', 'http://localhost:3001', '192.168.8.105:5173'],
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
  windowMs: 1 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many login attempts. Please try again in 1 minute.' },
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

// ─── Database Connection & Server Start ────────────────────
const PORT = process.env.PORT || 5050;

const startServer = async () => {
  try {
    await connectDB();
    validateCloudinaryConfig();
    app.listen(PORT, () => {
      console.log(`🚀 FinPay API running on port ${PORT} [${process.env.NODE_ENV || 'development'}]`);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err.message);
    process.exit(1);
  }
};

startServer();
