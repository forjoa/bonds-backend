import { Request, Response } from 'express'
import {
  newNotificationService,
  getNotificationsService,
  markAsReadAllService,
  markAsReadService,
} from '../services/notificationService.js'

export const newNotification = async (req: Request, res: Response) => {
  try {
    const result = await newNotificationService(req.body)
    res.json(result)
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
}

export const getNotifications = async (req: Request, res: Response) => {
  try {
    const result = await getNotificationsService(req.body)
    res.json(result)
  } catch (error) {
    res.status(500).json({ success: false, messsage: (error as Error).message })
  }
}
export const markAsRead = async (req: Request, res: Response) => {
  try {
    const result = await markAsReadService(req.body)
    res.json(result)
  } catch (error) {
    res.status(500).json({ success: false, messsage: (error as Error).message })
  }
}
export const markAsReadAll = async (req: Request, res: Response) => {
  try {
    const result = await markAsReadAllService(req.body)
    res.json(result)
  } catch (error) {
    res.status(500).json({ success: false, messsage: (error as Error).message })
  }
}
