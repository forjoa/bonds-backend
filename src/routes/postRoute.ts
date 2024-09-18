import express from 'express'
import {
  comment,
  getHome,
  like,
  myProfile,
  uploadPost,
  getPostInfo,
} from '../controllers/postController.js'

const router = express.Router()

router.post('/uploadPost', uploadPost)
router.post('/getHome', getHome)
router.post('/like', like)
router.post('/comment', comment)
router.post('/myProfile', myProfile)
router.post('/post', getPostInfo)

export default router
