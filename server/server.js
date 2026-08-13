import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import { clerkMiddleware, clerkClient, getAuth } from '@clerk/express'

const app = express();

// Auth verification middleware (replaces deprecated requireAuth)
const verifyAuth = (req, res, next) => {
	const auth = getAuth(req);
	if (!auth.userId) {
		return res.status(401).json({ error: 'Unauthorized' });
	}
	next();
};

// Dynamic import for routes that depend on env vars
let aiRouter;
(async () => {
	aiRouter = (await import('./routes/aiRoutes.js')).default;
	
	// Move the rest of app setup here after aiRouter is loaded
	startApp();
})();

function startApp() { 
	// Middlewares
	app.use(cors());
	app.use(express.json());
	app.use(clerkMiddleware())

	// Simple health route (no auth required)
	app.get('/', (req, res) => {
		res.json({ status: 'ok', timestamp: new Date().toISOString() });
	});

	// Example API route (no auth required)
	app.get('/api/ping', (req, res) => {
		res.json({ message: 'pong' });
	});

	// Apply auth only to /api/ai routes
	app.use("/api/ai", verifyAuth, aiRouter);

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
}

