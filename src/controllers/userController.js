import { getUsersService, loginService } from '../services/userService.js';

export const getUsers = async (req, res) => {
    try {
        const users = await getUsersService();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const result = await loginService(req.body)
        res.json(result)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}