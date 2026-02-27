// import express from 'express'
// import { postusersCon, loginUserCon } from '../controllers/usersCon.js'

// const router = express.Router()

// router.post('/users', postusersCon)       // register
// router.post('/users/login', loginUserCon) // login

// export default router
import express from 'express'
import { postusersCon, loginUserCon } from '../controllers/usersCon.js'

const router = express.Router()

router.post('/', postusersCon)        // POST /api/users
router.post('/login', loginUserCon)   // POST /api/users/login

export default router