import express from 'express';
import { newNotification } from '../controllers/notificationController.js';

const router = express.Router();

router.post('/newNotification', newNotification)

export default router