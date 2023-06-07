import mongoose,  { ConnectOptions } from 'mongoose';
import config from '../config/index.js'

class Database {
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

const dbConnection = new Database();

/** ********************mongo events************************* */
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected');
  // setTimeout(() => {
  //   console.log('Disconnecting after 5000ms');
  //   dbConnection.disconnect().then().catch();
  // }, 5000);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
  setTimeout(() => {
    console.log('Reconnecting after 2000ms');
    dbConnection.connect().then().catch();
  }, 5000);
});

mongoose.connection.on('error', (err) => {
  console.error(`Mongoose connection error: ${err}`);
});

mongoose.connection.on('reconnect', () => {
  console.log('Mongoose reconnected');
});

/** ********************mongo events************************* */

export default dbConnection
