// import express from 'express'
// import { postusersCon, loginUserCon, getAllUsersCon,getUserByIdCon,updateUserStatusCon,deleteUserCon,updateUserCon} from '../controllers/usersCon.js'

// const router = express.Router()

// router.post('/', postusersCon)       
// router.post('/login', loginUserCon)   
// // 🔐 Authentication
// // router.post('/users/login', loginUserCon)        // POST /api/users/login

// // User Management 
// router.post('/users', postusersCon)               
// router.get('/users', getAllUsersCon)              
// router.get('/users/:id', getUserByIdCon)         
// router.put('/users/:id/status', updateUserStatusCon) 
// router.delete('/users/:id', deleteUserCon)       
// router.put('/users/:id', updateUserCon) 
// export default router

import express from 'express'
import {
  postusersCon,
  loginUserCon,
  getAllUsersCon,
  getUserByIdCon,
  updateUserStatusCon,
  deleteUserCon,
  updateUserCon
} from '../controllers/usersCon.js'

const router = express.Router()

// 🔐 Auth
router.post('/', postusersCon)        // POST /api/users  (register)
router.post('/login', loginUserCon)   // POST /api/users/login (login)

// 👤 User management (admin)
router.get('/', getAllUsersCon)       // GET /api/users
router.get('/:id', getUserByIdCon)    // GET /api/users/:id
router.put('/:id/status', updateUserStatusCon) // PUT /api/users/:id/status
router.put('/:id', updateUserCon)     // PUT /api/users/:id
router.delete('/:id', deleteUserCon)  // DELETE /api/users/:id

export default router