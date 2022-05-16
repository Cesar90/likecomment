import express from 'express'
const router = express.Router()
import {
  createComment,
  getComments,
  createUpvote,
} from '../controllers/commentController.js'

router.route('/').get(getComments).post(createComment)
router.route('/upvote').post(createUpvote)
export default router
