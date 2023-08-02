import { Document } from 'mongoose';

export enum EProvider {
  Google = 'google',
  Password = 'password',
}

export interface IUser {
  email: string;
  username: string;
  password: string;
  currentProvider: EProvider; // Use the Provider enum type
  providers: EProvider[]; // Use the Provider enum type as array elements
}

// Define the IUserDocument interface for the Mongoose document
export interface IUserDocument extends IUser, Document {
  checkPassword(candidatePassword: string): Promise<boolean>;
  createToken(): Promise<{
    accessToken: string;
    accessTokenExpiresAt: Date;
    refreshToken: string;
    refreshTokenExpiresAt: Date;
  }>;
}
