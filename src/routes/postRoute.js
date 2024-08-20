import express from 'express';
import { comment, getHome, like, uploadPost } from '../controllers/postController.js';

const router = express.Router();

router.post('/uploadPost', uploadPost)
router.post('/getHome', getHome)
router.post('/like', like)
router.post('/comment', comment)

export default router