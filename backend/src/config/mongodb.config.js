import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully at:', conn.connection.host);
  } catch (error) {
    console.error('MongoDB connection failed: ', error);
    process.exit(1);
  }
};

export default connectDB;