"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const models_1 = require("./models");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const sendCollection = async (res, resource, query) => {
    try {
        const data = await query;
        res.json({ apiBaseUrl, resource, data });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to load data', error });
    }
};
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', apiBaseUrl });
});
app.get('/api/users/', async (_req, res) => {
    await sendCollection(res, 'users', models_1.User.find());
});
app.post('/api/users/', async (req, res) => {
    try {
        const user = await models_1.User.create(req.body);
        res.status(201).json({ apiBaseUrl, resource: 'users', data: user });
    }
    catch (error) {
        res.status(400).json({ message: 'Unable to create user', error });
    }
});
app.get('/api/teams/', async (_req, res) => {
    await sendCollection(res, 'teams', models_1.Team.find());
});
app.post('/api/teams/', async (req, res) => {
    try {
        const team = await models_1.Team.create(req.body);
        res.status(201).json({ apiBaseUrl, resource: 'teams', data: team });
    }
    catch (error) {
        res.status(400).json({ message: 'Unable to create team', error });
    }
});
app.get('/api/activities/', async (_req, res) => {
    await sendCollection(res, 'activities', models_1.Activity.find());
});
app.post('/api/activities/', async (req, res) => {
    try {
        const activity = await models_1.Activity.create(req.body);
        res.status(201).json({ apiBaseUrl, resource: 'activities', data: activity });
    }
    catch (error) {
        res.status(400).json({ message: 'Unable to create activity', error });
    }
});
app.get('/api/leaderboard/', async (_req, res) => {
    await sendCollection(res, 'leaderboard', models_1.Leaderboard.find().sort({ rank: 1 }));
});
app.get('/api/workouts/', async (_req, res) => {
    await sendCollection(res, 'workouts', models_1.Workout.find());
});
app.post('/api/workouts/', async (req, res) => {
    try {
        const workout = await models_1.Workout.create(req.body);
        res.status(201).json({ apiBaseUrl, resource: 'workouts', data: workout });
    }
    catch (error) {
        res.status(400).json({ message: 'Unable to create workout', error });
    }
});
mongoose_1.default
    .connect(MONGO_URI)
    .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        console.log(`API base URL: ${apiBaseUrl}`);
    });
})
    .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
});
