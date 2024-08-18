import express from 'express';
import { getHome, uploadPost } from '../controllers/postController.js';

const router = express.Router();

router.post('/uploadPost', uploadPost)
router.post('/getHome', getHome)

export default router