import { Request, Response } from 'express'
import {
  commentService,
  getHomeService,
  myProfileService,
  likeService,
  uploadPostService,
  getPostInfoService,
} from '../services/postService.js'

export const uploadPost = async (req: Request, res: Response) => {
  try {
    const result = await uploadPostService(req.body)
    res.json(result)
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
}

export const getHome = async (req: Request, res: Response) => {
  try {
    const result = await getHomeService(req.body)
    res.json(result)
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
}

export const like = async (req: Request, res: Response) => {
  try {
    const result = await likeService(req.body)
    res.json(result)
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
}

export const comment = async (req: Request, res: Response) => {
  try {
    const result = await commentService(req.body)
    res.json(result)
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
}

export const myProfile = async (req: Request, res: Response) => {
  try {
    const result = await myProfileService(req.body)
    res.json(result)
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
}

export const getPostInfo = async (req: Request, res: Response) => {
  try {
    const result = await getPostInfoService(req.body)
    res.json(result)
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
}
