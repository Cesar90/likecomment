import express from 'express'
const router = express.Router()
import { getFakeUser } from '../controllers/fakeUserController.js'

router.route('/current').get(getFakeUser)
export default router
