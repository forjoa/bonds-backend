import { sql } from '../config/database.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

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
        '6d547069ab59b1f018df00788918178740a88853c84173f22ee64647d72f17e28274925ed4d57a28e78649d9996b9acd1c844cb389034d87a9835c38d49624a0',
        { expiresIn: '7d' }
    )

    return { success: true, token }
}