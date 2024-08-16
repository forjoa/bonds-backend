import { sql } from "../config/database.js"

export const uploadPostService = async ({ userid, content }) => {
    const result = await sql`INSERT INTO posts (userid, content) VALUES (${userid}, ${content})`

    return result.length === 0 ? { success: true, message: 'Post uploaded correctly.' } : { success: false, message: 'Something went wrong.' }
}