import { Request, Response } from 'express'
import {
  getUsersService,
  loginService,
  registerService,
  editProfileService,
} from '../services/userService.js'

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await getUsersService()
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const result = await loginService(req.body)
    res.json(result)
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
}

export const register = async (req: Request, res: Response) => {
  try {
    const result = await registerService(req.body)
    res.json(result)
  } catch (error) {
    res.status(500).json({ success: false, messsage: (error as Error).message })
  }
}
export const editProfile = async (req: Request, res: Response) => {
  try {
    const result = await editProfileService(req.body)
    res.json(result)
  } catch (error) {
    res.status(500).json({ success: false, messsage: (error as Error).message })
  }
}
