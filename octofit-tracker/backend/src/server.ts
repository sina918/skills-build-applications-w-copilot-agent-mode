import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectToDatabase } from './database';
import {
  Activity,
  Leaderboard,
  Team,
  User,
  Workout,
} from './models';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(cors());
app.use(express.json());

const sendCollection = async (
  res: express.Response,
  resource: string,
  query: Promise<unknown>,
) => {
  try {
    const data = await query;
    res.json({ apiBaseUrl, resource, data });
  } catch (error) {
    res.status(500).json({ message: 'Failed to load data', error });
  }
};

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', apiBaseUrl });
});

app.get('/api/users/', async (_req, res) => {
  await sendCollection(res, 'users', User.find());
});

app.post('/api/users/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ apiBaseUrl, resource: 'users', data: user });
  } catch (error) {
    res.status(400).json({ message: 'Unable to create user', error });
  }
});

app.get('/api/teams/', async (_req, res) => {
  await sendCollection(res, 'teams', Team.find());
});

app.post('/api/teams/', async (req, res) => {
  try {
    const team = await Team.create(req.body);
    res.status(201).json({ apiBaseUrl, resource: 'teams', data: team });
  } catch (error) {
    res.status(400).json({ message: 'Unable to create team', error });
  }
});

app.get('/api/activities/', async (_req, res) => {
  await sendCollection(res, 'activities', Activity.find());
});

app.post('/api/activities/', async (req, res) => {
  try {
    const activity = await Activity.create(req.body);
    res.status(201).json({ apiBaseUrl, resource: 'activities', data: activity });
  } catch (error) {
    res.status(400).json({ message: 'Unable to create activity', error });
  }
});

app.get('/api/leaderboard/', async (_req, res) => {
  await sendCollection(res, 'leaderboard', Leaderboard.find().sort({ rank: 1 }));
});

app.get('/api/workouts/', async (_req, res) => {
  await sendCollection(res, 'workouts', Workout.find());
});

app.post('/api/workouts/', async (req, res) => {
  try {
    const workout = await Workout.create(req.body);
    res.status(201).json({ apiBaseUrl, resource: 'workouts', data: workout });
  } catch (error) {
    res.status(400).json({ message: 'Unable to create workout', error });
  }
});

const startServer = async () => {
  try {
    await connectToDatabase();
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`API base URL: ${apiBaseUrl}`);
    });
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

startServer();
