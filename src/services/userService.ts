import { sql } from '../config/database.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
// types / interfaces
import {
  EditProfileParams,
  LoginParams,
  RegisterParams,
} from '../types/serviceTypes.js'

config()

export const getUsersService = async () => {
  const result = await sql`SELECT * FROM users`
  return result
}

export const loginService = async ({ email, password }: LoginParams) => {
  const result = await sql`SELECT * FROM users WHERE email = ${email}`

  if (!result[0]) {
    return { success: false, message: 'There is no existing account.' }
  }

  const userInfo = result[0]

  if (!(await bcryptjs.compare(password, userInfo.password))) {
    return { success: false, message: 'Incorrect password.' }
  }

  delete userInfo.password

  const token = jwt.sign(userInfo, process.env.SIGNATURE as string, {
    expiresIn: '7d',
  })

  return { success: true, token }
}

export const registerService = async ({
  username,
  fullname,
  email,
  password,
  phone,
  profilephoto,
  bio,
}: RegisterParams) => {
  const emailFlag = await sql`SELECT * FROM users WHERE email = ${email}`

  if (emailFlag.length > 0)
    return {
      success: false,
      message: 'An account already exists with this email.',
    }

  const usernameFlag =
    await sql`SELECT * FROM users WHERE username = ${username}`

  if (usernameFlag.length > 0)
    return {
      success: false,
      message: 'An account already exists with this username.',
    }

  const hashedPassword = await bcryptjs.hash(password, 10)
  const result =
    await sql`INSERT INTO users (username, fullname, email, password, phone, profilephoto, bio) VALUES (${username}, ${fullname}, ${email}, ${hashedPassword}, ${phone}, ${profilephoto}, ${bio})`

  return result.length === 0
    ? { success: true, message: 'User created correctly.' }
    : { success: false, message: 'Something went wrong.' }
}

export const editProfileService = async ({
  userid,
  username,
  fullname,
  email,
  password,
  phone,
  profilephoto,
  bio,
}: EditProfileParams) => {
  try {
    const hashedPassword = await bcryptjs.hash(password, 10)
    const result = await sql`UPDATE users
                               SET username = ${username},
                                   fullname = ${fullname},
                                   email = ${email},
                                   phone = ${phone}, 
                                   profilephoto = ${profilephoto},
                                   password = ${hashedPassword},
                                   bio = ${bio}
                                WHERE userid = ${userid};`
  } catch (error) {
    console.error('Error updating profile: ', error)
    throw new Error('Failed to update profile')
  }
}

export const getUserService = async ({ userid }: { userid: number }) => {
  const [result] = await sql`SELECT * FROM users WHERE userid = ${userid}`
  return result
}