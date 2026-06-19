import mongoose, { Schema, Document } from 'mongoose';

export interface IActivity extends Document {
  user: string;
  type: string;
  duration: number;
  date?: Date;
}

const ActivitySchema = new Schema<IActivity>({
  user: { type: String, required: true },
  type: { type: String, required: true },
  duration: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

export const Activity = mongoose.model<IActivity>('Activity', ActivitySchema);
