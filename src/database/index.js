import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const DATABASE_PATH = `${process.env.DATABASE_URL}/${process.env.DATABASE_NAME}`;
    const conn = await mongoose.connect(DATABASE_PATH);

    console.log('mongoDB connected!');
    console.log(`DB HOST : ${conn}`);

    console.log(conn.connection.host);
  } catch (error) {
    console.log('mongoDB connection failed :', error);
    mongoose.connection.close();
    process.exit(1); // you can also throw error here
  }
};
