import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password?: string;
  team?: string;
  workouts?: string[];
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  team: { type: String },
  workouts: { type: [String], default: [] },
});

export const User = mongoose.model<IUser>('User', UserSchema);
