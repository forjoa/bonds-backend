import jwt from 'jsonwebtoken'
import { config } from 'dotenv'

config()

export function validateToken(token: string) {
  try {
    const decoded = jwt.verify(token, process.env.SIGNATURE as string)
    return decoded
  } catch (err) {
    return null
  }
}
