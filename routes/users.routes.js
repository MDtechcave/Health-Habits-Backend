import express from 'express'
import { postusersCon, loginUserCon } from '../controllers/usersCon.js'

const router = express.Router()

router.post('/users', postusersCon)       // register
router.post('/users/login', loginUserCon) // login

export default router