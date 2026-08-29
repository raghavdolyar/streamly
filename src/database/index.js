import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`${process.env.DATABASE_URL}/${process.env.DATABASE_NAME}`);
    console.log('mongoDB connected!');
    console.log(conn.connection.host);
  } catch (error) {
    console.log('mongoDB connection failed :', error);
    mongoose.connection.close();
    process.exit(1); // you can also throw error here
  }
};
