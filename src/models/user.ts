import { Schema, model } from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { EProvider, IUserDocument } from '../types/models/user.js';
import { ITokenDocument } from '../types/models/token.js';
import config from '../config/index.js';
import Token from './token.js';

// Create the Mongoose schema for User
const userSchema = new Schema<IUserDocument>({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  // current provider gives the info about the latest provider he uses for login example: google or password
  currentProvider: { type: String, enum: Object.values(EProvider), required: true },
  // currently accepted providers password and google
  providers: { type: [ String ], enum: Object.values(EProvider), required: true },
}, { timestamps: true });

userSchema.index({ email: 1 });


// Hash the password before saving it
userSchema.pre<IUserDocument>('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

/**
 * this function compares user input password with hash password
 *
 * @param {*} candidatePassword
 * @returns boolean value
 */
userSchema.methods.checkPassword = async function (candidatePassword: string): Promise<boolean> {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    return false;
  }
};

userSchema.methods.createToken = async function (): Promise<{
  accessToken: string;
  accessTokenExpiresAt: Date;
  refreshToken: string;
  refreshTokenExpiresAt: Date;
}> {
  const accessToken = jwt.sign({ userId: this._id }, config.jwt.secret, {
    expiresIn: config.jwt.accessTokenexpiry,
  });

  const refreshToken = jwt.sign({ userId: this._id }, config.jwt.secret, {
    expiresIn: config.jwt.refreshTokenExpiry, // Refresh token expires in 7 days
  });

  const accessTokenExpirationTime = jwt.decode(accessToken)?.exp;
  const refreshTokenExpirationTime = jwt.decode(refreshToken)?.exp;

  if (!accessTokenExpirationTime || !refreshTokenExpirationTime) {
    throw new Error('Failed to decode token expiration time.');
  }

  const accessTokenExpiresAt = new Date(accessTokenExpirationTime * 1000);
  const refreshTokenExpiresAt = new Date(refreshTokenExpirationTime * 1000);

  // Create and save the new token in the Token collection
  const tokenData: ITokenDocument = new Token({
    user: this._id,
    accessToken,
    refreshToken,
  });
  await tokenData.save();

  return {
    accessToken,
    accessTokenExpiresAt,
    refreshToken,
    refreshTokenExpiresAt,
  };
};

// Create the Mongoose model for User using the schema
const User = model<IUserDocument>('User', userSchema);

export default User;
