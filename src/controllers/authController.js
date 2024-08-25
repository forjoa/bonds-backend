import { verifyTokenService } from '../services/authService.js'

export const verifyToken = async (req, res) => {
  try {
    const result = await verifyTokenService(req.body)
    res.json(result)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
