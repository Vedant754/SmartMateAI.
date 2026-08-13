import express from 'express';
import { genArticle, genBlog, genImg } from '../controllers/aiController.js';
import { auth } from '../middleware/auth.js';

const aiRouter = express.Router();

aiRouter.post('/generate-article',auth,genArticle);
aiRouter.post('/generate-blog',auth,genBlog);
aiRouter.post('/generate-image',auth,genImg);

export default aiRouter;