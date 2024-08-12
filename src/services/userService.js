import { sql } from '../config/database.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

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

    const { password: _, ...userPayload } = userInfo;

    const token = jwt.sign(
        userPayload,
        process.env.SIGNATURE,
        { expiresIn: '7d' }
    )

    return { success: true, token }
}