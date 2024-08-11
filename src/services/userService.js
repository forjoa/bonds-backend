import { sql } from '../config/database.js';

export const getUsersService = async () => {
    const result = await sql`SELECT * FROM users`
    return result;
};