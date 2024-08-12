import express from 'express';
import { getUsers, login } from '../controllers/userController.js';

const router = express.Router();

router.get('/', getUsers);
router.post('/login', login)

export default router;