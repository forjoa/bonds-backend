import express from 'express';
import { getHome, like, uploadPost } from '../controllers/postController.js';

const router = express.Router();

router.post('/uploadPost', uploadPost)
router.post('/getHome', getHome)
router.post('/like', like)

export default router