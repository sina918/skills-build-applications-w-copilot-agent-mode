import mongoose, { Schema, Document } from 'mongoose';

export interface ILeaderboard extends Document {
  rank: number;
  username: string;
  score: number;
}

const LeaderboardSchema = new Schema<ILeaderboard>({
  rank: { type: Number, required: true, unique: true },
  username: { type: String, required: true },
  score: { type: Number, required: true },
});

export const Leaderboard = mongoose.model<ILeaderboard>('Leaderboard', LeaderboardSchema);
