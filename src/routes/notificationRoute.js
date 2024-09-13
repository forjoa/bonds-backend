import express from 'express'
import { newNotification, getNotifications } from '../controllers/notificationController.js'

const router = express.Router()

router.post('/newNotification', newNotification)
router.post('/getNotifications', getNotifications)

export default router
