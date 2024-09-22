import express from 'express'
import { getUsers, login, register, editProfile, userProfile } from '../controllers/userController.js'

const router = express.Router()

router.get('/', getUsers)
router.post('/login', login)
router.post('/register', register)
router.post('/editProfile', editProfile)
router.post('/userProfile', userProfile)

export default router
