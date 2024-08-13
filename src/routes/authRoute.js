import express from 'express';
import { verifyToken } from '../controllers/authController.js';

const router = express.Router();

router.post('/verifyToken', verifyToken)

export default router;