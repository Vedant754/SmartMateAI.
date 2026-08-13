import express from 'express';
import { genArticle } from '../controllers/aiController.js';
import { auth } from '../middleware/auth.js';

const aiRouter = express.Router();

aiRouter.post('/generate-article',auth,genArticle);

export default aiRouter;