import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';

export const connectToDatabase = async () => {
  if (mongoose.connection.readyState >= 1) {
    return mongoose.connection;
  }

  await mongoose.connect(MONGO_URI);
  return mongoose.connection;
};
