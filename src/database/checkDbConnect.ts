import dbConnect from './dbConnect';
import mongoose from 'mongoose';

export async function checkDbConnection(): Promise<boolean> {
  try {
    await dbConnect();
    
    if (mongoose.connection.readyState === 1) {
      console.log('Database is connected.');
      return true;
    } else {
      console.log('Database is not connected.');
      return false;
    }
  } catch (error) {
    console.error('Database connection error:', error);
    return false;
  }
}