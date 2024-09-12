import { sql } from '../config/database.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { config } from 'dotenv'

config()

export const getUsersService = async () => {
  const result = await sql`SELECT * FROM users`
  return result
}

export const loginService = async ({ email, password }) => {
  const result = await sql`SELECT * FROM users WHERE email = ${email}`

  if (!result[0]) {
    return { success: false, message: 'There is no existing account.' }
  }

  const userInfo = result[0]

  if (!(await bcryptjs.compare(password, userInfo.password))) {
    return { success: false, message: 'Incorrect password.' }
  }

  delete userInfo.password

  const token = jwt.sign(userInfo, process.env.SIGNATURE, {
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
}) => {
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

export const getNotificationsService = async ({ id }) => {
  const notifications = await sql`
    SELECT n.type, n.referenceid, u.username, u.profilephoto,
           CASE 
             WHEN n.type = 'like' THEN l.postid
             WHEN n.type = 'comment' THEN c.postid
             -- Agrega más casos según sea necesario para otros tipos
           END AS postid
    FROM notifications n
    JOIN users u ON u.userid = 
      CASE 
        WHEN n.type = 'like' THEN (SELECT userid FROM likes WHERE likeid = n.referenceid)
        WHEN n.type = 'comment' THEN (SELECT userid FROM comments WHERE commentid = n.referenceid)
        -- Agrega más casos según sea necesario para otros tipos
      END
    LEFT JOIN likes l ON n.type = 'like' AND l.likeid = n.referenceid
    LEFT JOIN comments c ON n.type = 'comment' AND c.commentid = n.referenceid
    -- Agrega más LEFT JOINs según sea necesario para otros tipos
    WHERE n.userid = ${id} AND u.userid != ${id}
  `;

  return notifications;
};
