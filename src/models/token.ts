import { ITokenDocument } from '../types/models/token.js';
import { Schema, model } from 'mongoose';

// Create the Mongoose schema for Token
const tokenSchema = new Schema<ITokenDocument>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  accessToken: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
    required: true,
  },
}, { timestamps: true });

tokenSchema.index({ accessToken: -1 });
tokenSchema.index({ refreshToken: -1 });
tokenSchema.index({ user: -1 });

// Create the Mongoose model for Token using the schema
const Token = model<ITokenDocument>('Token', tokenSchema);

export default Token;
