import { uploadPostService } from "../services/postService.js"

export const uploadPost = async (req, res) => {
    try {
        const result = await uploadPostService(req.body)
        res.json(result)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}