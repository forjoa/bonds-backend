import { getUsersService } from '../services/userService.js';

export const getUsers = async (req, res) => {
    try {
        const users = await getUsersService();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};