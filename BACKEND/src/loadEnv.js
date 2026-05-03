import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const envPath = fileURLToPath(new URL('../.env', import.meta.url));
const result = dotenv.config({ path: envPath });

if (result.error) {
  console.error('[loadEnv] Failed to load .env:', result.error);
}
