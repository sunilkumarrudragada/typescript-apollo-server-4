import { Document } from 'mongoose';
import { UserDocument } from './user';

export interface IToken {
  user: UserDocument['_id']; // Use the _id type from the UserDocument for the user field
  accessToken: string;
  refreshToken: string;
}

// Define the TokenDocument interface for the Mongoose document
export interface ITokenDocument extends IToken, Document {}
