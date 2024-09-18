import jwt from 'jsonwebtoken'
import { config } from 'dotenv'

config()

export function validateToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.SIGNATURE)
    return decoded
  } catch (err) {
    return null
  }
}
