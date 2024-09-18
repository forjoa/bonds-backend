import express from 'express'
import { newNotification, getNotifications, markAsRead, markAsReadAll } from '../controllers/notificationController.js'

const router = express.Router()

router.post('/newNotification', newNotification)
router.post('/getNotifications', getNotifications)
router.post('/markAsRead', markAsRead)
router.post('/markAsReadAll', markAsReadAll)

export default router
