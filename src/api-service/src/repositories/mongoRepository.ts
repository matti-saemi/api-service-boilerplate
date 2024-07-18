import mongoose from 'mongoose';
import { config } from '../Config';

export const connectDB = async () => {
  const { username, password, host, port } = config.mongoDb;
  let url;

  if (config.environment === 'test') {
    url = `mongodb://${host}:${port}/test`;
  } else {
    url = `mongodb://${host}:${port}`;
  }

  try {
    const connection = await mongoose.connect(url);
    console.log(`MongoDB Connected: ${connection.connection.host}`);
  } catch (error: any) {
    console.error(`Mongo Error: ${error.message}`);
    process.exit(1);
  }
};
