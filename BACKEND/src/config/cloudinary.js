import { v2 as cloudinary } from 'cloudinary';

const missing = [];
if (!process.env.CLOUDINARY_CLOUD_NAME) missing.push('CLOUDINARY_CLOUD_NAME');
if (!process.env.CLOUDINARY_API_KEY) missing.push('CLOUDINARY_API_KEY');
if (!process.env.CLOUDINARY_API_SECRET) missing.push('CLOUDINARY_API_SECRET');

if (missing.length > 0) {
  throw new Error(`[Cloudinary Config] Missing required environment variables: ${missing.join(', ')}`);
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export { cloudinary };