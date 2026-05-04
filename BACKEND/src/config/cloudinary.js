import { v2 as cloudinary } from 'cloudinary';

// ─── Validate and configure Cloudinary ────────────────────
const validateCloudinaryConfig = () => {
  const missing = [];
  if (!process.env.CLOUDINARY_CLOUD_NAME) missing.push('CLOUDINARY_CLOUD_NAME');
  if (!process.env.CLOUDINARY_API_KEY) missing.push('CLOUDINARY_API_KEY');
  if (!process.env.CLOUDINARY_API_SECRET) missing.push('CLOUDINARY_API_SECRET');

  if (missing.length > 0) {
    console.warn(`⚠️  [Cloudinary Config] Missing environment variables: ${missing.join(', ')}`);
    console.warn('⚠️  Cloudinary features will not work. Please add these to your .env file.');
    return false;
  }

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  console.log('✅ Cloudinary configured successfully');
  return true;
};

export { cloudinary, validateCloudinaryConfig };