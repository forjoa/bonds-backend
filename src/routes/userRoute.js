import express from 'express'
import { getUsers, login, register, getNotifications } from '../controllers/userController.js'

const router = express.Router()

router.get('/', getUsers)
router.post('/notifications', getNotifications)
router.post('/login', login)
router.post('/register', register)

export default router
