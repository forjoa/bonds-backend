import { Request, Response } from 'express'
import { verifyTokenService } from '../services/authService.js'

export const verifyToken = async (req: Request, res: Response) => {
  try {
    const result = await verifyTokenService(req.body)
    res.json(result)
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
}
