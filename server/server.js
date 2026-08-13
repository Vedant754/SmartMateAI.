import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { clerkMiddleware, clerkClient, getAuth, requireAuth  } from '@clerk/express'
import aiRouter from './routes/aiRoutes';

// Load environment variables from .env file
dotenv.config();

const app = express(); 

// Middlewares
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware())

// Simple health route
app.get('/', (req, res) => {
	res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use(requireAuth())

// Example API route
app.get('/api/ping', (req, res) => {
	res.json({ message: 'pong' });
});

app.use(/api/ai,aiRouter);

// 404 handler
app.use((req, res) => {
	res.status(404).json({ error: 'Not Found' });
});

// Error handler
app.use((err, req, res, next) => {
	console.error(err);
	res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});

