import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
import { sql } from '../config/database.js'

config()

interface TokenPayload {
  userid: string
  exp: number
}

export const verifyTokenService = async ({ token }: { token: string }) => {
  try {
    const decoded = jwt.verify(
      token,
      process.env.SIGNATURE as string
    ) as TokenPayload

    const userId = decoded.userid

    const result = await sql`SELECT * FROM users WHERE userid = ${userId}`

    if (!result[0]) {
      return { success: false, message: 'User not found.' }
    }

    const userInfo = result[0]
    const { password: _, ...userPayload } = userInfo

    return { success: true, user: userPayload }
  } catch (error) {
    return { success: false, message: 'Invalid or expired token.' }
  }
}
