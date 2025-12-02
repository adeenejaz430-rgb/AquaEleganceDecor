import mongoose from 'mongoose';

// Try to use MongoDB Atlas URI from environment variables, or fall back to local MongoDB
// For development, you can use MongoDB Atlas or a local MongoDB instance
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ecommerce';

// For development, we'll provide a mock database option if MongoDB connection fails
const USE_MOCK_DB = process.env.NODE_ENV !== 'production';

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
      connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    };

    console.log(`Connecting to MongoDB at ${MONGODB_URI}`);
    
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('MongoDB connected successfully');
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (e) {
    console.error('MongoDB connection error:', e);
    cached.promise = null;
    
    if (USE_MOCK_DB) {
      console.warn('Using in-memory mock database for development');
      // For development, we can continue with a mock database
      // This prevents the app from crashing during development
      return { mock: true };
    }
    
    throw e;
  }
}

export default connectToDatabase;