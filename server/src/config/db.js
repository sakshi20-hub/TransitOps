<<<<<<< HEAD
export {}
=======

import mongoose from 'mongoose';

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error('MONGO_URI is not defined in environment variables.');
  }

  try {
    

    const conn = await mongoose.connect(mongoUri);

    console.log(`MongoDB connected: ${conn.connection.host}/${conn.connection.name}`);
  } catch (error) {
    console.error(`Failed to connect to MongoDB: ${error.message}`);
    throw error;
  }
};

export default connectDB;
>>>>>>> origin/main
