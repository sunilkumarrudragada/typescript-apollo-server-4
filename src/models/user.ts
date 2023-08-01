import { IUser, EProvider, IUserDocument } from '../types/models/user.js';
import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

// Create the Mongoose schema for User
const userSchema = new Schema<IUser>({
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  // current provider gives the info about the latest provider he uses for login example: google or password
  currentProvider: { type: String, enum: Object.values(EProvider), required: true },
  // currently accepted providers password and google
  providers: { type: [ String ], enum: Object.values(EProvider), required: true },
}, { timestamps: true });


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

// Add a function to check the password
userSchema.methods.checkPassword = async function (candidatePassword: string): Promise<boolean> {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    return false;
  }
};

// Create the Mongoose model for User using the schema
const User = model<IUserDocument>('User', userSchema);

export default User;
