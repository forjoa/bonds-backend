import express from 'express'
import { getUsers, login, register, editProfile } from '../controllers/userController.js'

const router = express.Router()

router.get('/', getUsers)
router.post('/login', login)
router.post('/register', register)
router.post('/editProfile', editProfile)

export default router
