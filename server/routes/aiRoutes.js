import express from 'express';
import { genArticle, genBlog, genImg, getUserHistory, updateGeneration, createGeneration } from '../controllers/aiController.js';
import { auth } from '../middleware/auth.js';

const aiRouter = express.Router();

aiRouter.get('/history', auth, getUserHistory);
aiRouter.post('/history', auth, createGeneration);
aiRouter.put('/history/:id', auth, updateGeneration);
aiRouter.post('/generate-article',auth,genArticle);
aiRouter.post('/generate-blog',auth,genBlog);
aiRouter.post('/generate-image',auth,genImg);

export default aiRouter;