import mongoose,  { ConnectOptions } from 'mongoose';
import { DatabaseModels } from '../types/models/index.js';
import config from '../config/index.js';
import User from './user.js';
import Token from './token.js';

class Database {
  private dbUri:string;
  private connectionOptions: ConnectOptions;
  private _models: DatabaseModels;

  constructor(dbUri:string, connectionOptions:ConnectOptions) {
    this.dbUri= dbUri;
    this.connectionOptions = connectionOptions;
    this._models = {
      User,
      Token,
    };
  }

  get models(): DatabaseModels {
    // Here, we return an object containing references to all the models.
    return this._models;
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

const dbConnection = new Database(
  config.database.dbUri,
  {
    dbName: config.database.dbName,
  }
);

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

export default dbConnection;
