import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const dbUri = process.env.MONGO_URI || process.env.MONGODB_URI;
    const conn = await mongoose.connect(dbUri);

    console.log(`🍃 MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};

export default connectDB;