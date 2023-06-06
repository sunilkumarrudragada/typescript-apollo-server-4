import mongoose from 'mongoose';

export class Database {
  private dbUri:string;

  constructor() {
    this.dbUri= process.env.DATABASE_URL;
  }

  public async connect(): Promise<void> {
    try {
      await mongoose.connect(this.dbUri);
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Failed to connect to MongoDB:', error);
    }
  }

  public async disconnect(): Promise<void> {
    try {
      await mongoose.disconnect();
      console.log('Disconnected from MongoDB');
    } catch (error) {
      console.error('Failed to disconnect from MongoDB:', error);
    }
  }
}
