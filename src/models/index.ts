import mongoose,  { ConnectOptions } from 'mongoose';
import config from '../config/index.js'

export class Database {
  private dbUri:string;
  private connectionOptions: ConnectOptions;

  constructor() {
    this.dbUri= config.database.dbUri;
    this.connectionOptions = {
      dbName: config.database.dbName,
    };
  }

  public async connect(): Promise<void> {
    try {
      await mongoose.connect(this.dbUri, this.connectionOptions);
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
