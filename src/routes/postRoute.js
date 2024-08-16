import express from 'express';
import { uploadPost } from '../controllers/postController.js';

const router = express.Router();

router.post('/uploadPost', uploadPost)

export default router