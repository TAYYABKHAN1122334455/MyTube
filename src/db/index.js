import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`✅ DB Connected`);
  } catch (error) {
    console.error('❌ Database Not Connected:', error);
    process.exit(1);
  }
};

export default connectDB;
