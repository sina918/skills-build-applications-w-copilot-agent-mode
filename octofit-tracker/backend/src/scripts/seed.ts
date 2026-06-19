// Seed the octofit_db database with test data
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from '../models/User';
import { Team } from '../models/Team';
import { Activity } from '../models/Activity';
import { Leaderboard } from '../models/Leaderboard';
import { Workout } from '../models/Workout';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';

const seedData = async () => {
  await mongoose.connect(MONGO_URI);
  console.log('Seed the octofit_db database with test data');

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Leaderboard.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  const users = await User.insertMany([
    {
      username: 'alex',
      email: 'alex@example.com',
      team: 'Alpha Squad',
      workouts: ['HIIT', 'Yoga'],
    },
    {
      username: 'jordan',
      email: 'jordan@example.com',
      team: 'Beta Crew',
      workouts: ['Strength', 'Cardio'],
    },
    {
      username: 'morgan',
      email: 'morgan@example.com',
      team: 'Alpha Squad',
      workouts: ['Pilates'],
    },
  ]);

  await Team.insertMany([
    {
      name: 'Alpha Squad',
      members: users.filter((user) => user.team === 'Alpha Squad').map((user) => user.username),
      captain: 'alex',
    },
    {
      name: 'Beta Crew',
      members: users.filter((user) => user.team === 'Beta Crew').map((user) => user.username),
      captain: 'jordan',
    },
  ]);

  await Activity.insertMany([
    {
      user: 'alex',
      type: 'run',
      duration: 30,
      date: new Date('2026-06-18T07:00:00Z'),
    },
    {
      user: 'jordan',
      type: 'workout',
      duration: 45,
      date: new Date('2026-06-18T18:00:00Z'),
    },
    {
      user: 'morgan',
      type: 'cycling',
      duration: 25,
      date: new Date('2026-06-19T06:30:00Z'),
    },
  ]);

  await Leaderboard.insertMany([
    { rank: 1, username: 'alex', score: 98 },
    { rank: 2, username: 'jordan', score: 94 },
    { rank: 3, username: 'morgan', score: 91 },
  ]);

  await Workout.insertMany([
    { name: 'HIIT Blast', type: 'cardio', duration: 20, difficulty: 'medium' },
    { name: 'Yoga Flow', type: 'flexibility', duration: 15, difficulty: 'easy' },
    { name: 'Strength Builder', type: 'resistance', duration: 35, difficulty: 'hard' },
  ]);

  console.log('Database seeded successfully');
  await mongoose.disconnect();
};

seedData().catch((error) => {
  console.error('Seed error:', error);
  process.exit(1);
});
