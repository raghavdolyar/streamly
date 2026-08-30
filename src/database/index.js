import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}`);
    console.log('mongoDB connected!');
  } catch (error) {
    console.log('mongoDB connection failed :', error);
    mongoose.connection.close();
    process.exit(1); // you can also throw error here
  }
};
