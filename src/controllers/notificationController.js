import { newNotificationService } from '../services/notificationService.js'

export const newNotification = async (req, res) => {
  try {
    const result = await newNotificationService(req.body)
    res.json(result)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
