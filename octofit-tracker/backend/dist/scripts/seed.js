"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Seed the octofit_db database with test data
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("../database");
const User_1 = require("../models/User");
const Team_1 = require("../models/Team");
const Activity_1 = require("../models/Activity");
const Leaderboard_1 = require("../models/Leaderboard");
const Workout_1 = require("../models/Workout");
dotenv_1.default.config();
const seedData = async () => {
    await (0, database_1.connectToDatabase)();
    console.log('Seed the octofit_db database with test data');
    console.log(`Using MongoDB connection: ${database_1.MONGO_URI}`);
    await Promise.all([
        User_1.User.deleteMany({}),
        Team_1.Team.deleteMany({}),
        Activity_1.Activity.deleteMany({}),
        Leaderboard_1.Leaderboard.deleteMany({}),
        Workout_1.Workout.deleteMany({}),
    ]);
    const users = await User_1.User.insertMany([
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
    await Team_1.Team.insertMany([
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
    await Activity_1.Activity.insertMany([
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
    await Leaderboard_1.Leaderboard.insertMany([
        { rank: 1, username: 'alex', score: 98 },
        { rank: 2, username: 'jordan', score: 94 },
        { rank: 3, username: 'morgan', score: 91 },
    ]);
    await Workout_1.Workout.insertMany([
        { name: 'HIIT Blast', type: 'cardio', duration: 20, difficulty: 'medium' },
        { name: 'Yoga Flow', type: 'flexibility', duration: 15, difficulty: 'easy' },
        { name: 'Strength Builder', type: 'resistance', duration: 35, difficulty: 'hard' },
    ]);
    console.log('Database seeded successfully');
};
seedData().catch((error) => {
    console.error('Seed error:', error);
    process.exit(1);
});
