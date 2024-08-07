import { db } from '../config/database.js';

export const getUsersService = async () => {
    const { rows } = await db.execute({
        sql: 'SELECT * FROM users'
    });
    return rows;
};