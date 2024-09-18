import {
  commentService,
  getHomeService,
  getMyPostsService,
  likeService,
  uploadPostService,
  getPostInfoService,
} from '../services/postService.js'

export const uploadPost = async (req, res) => {
  try {
    const result = await uploadPostService(req.body)
    res.json(result)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getHome = async (req, res) => {
  try {
    const result = await getHomeService(req.body)
    res.json(result)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const like = async (req, res) => {
  try {
    const result = await likeService(req.body)
    res.json(result)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const comment = async (req, res) => {
  try {
    const result = await commentService(req.body)
    res.json(result)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const myProfile = async (req, res) => {
  try {
    const result = await getMyPostsService(req.body)
    res.json(result)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getPostInfo = async (req, res) => {
  try {
    const result = await getPostInfoService(req.body)
    res.json(result)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
