import mongoose from 'mongoose';

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('✅ MongoDB connection established successfully');
  } catch (error) {
    console.log('Failed connect database', error.message);
    process.exit(1);
  }
};

export default connectMongoDB;
