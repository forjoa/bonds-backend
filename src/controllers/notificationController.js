import { newNotificationService, getNotificationsService, markAsReadAllService, markAsReadService } from '../services/notificationService.js'

export const newNotification = async (req, res) => {
  try {
    const result = await newNotificationService(req.body)
    res.json(result)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getNotifications = async (req, res) => {
  try {
    const result = await getNotificationsService(req.body)
    res.json(result)
  } catch (error) {
    res.status(500).json({ success: false, messsage: error.message })
  }
}
export const markAsRead = async (req, res) => {
  try {
    const result = await markAsReadService(req.body)
    res.json(result)
  } catch (error) {
    res.status(500).json({ success: false, messsage: error.message })
  }
}
export const markAsReadAll = async (req, res) => {
  try {
    const result = await markAsReadAllService(req.body)
    res.json(result)
  } catch (error) {
    res.status(500).json({ success: false, messsage: error.message })
  }
}
