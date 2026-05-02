import dotenv from 'dotenv';
import app from './src/app.js';
import connectDB from './src/config/database.js';

dotenv.config();

const PORT = process.env.PORT || 5050;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`🚀 FinPay API running on port ${PORT} [${process.env.NODE_ENV || 'development'}]`);
  });
};

startServer();