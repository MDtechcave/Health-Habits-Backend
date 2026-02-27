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

// 🔐 Authentication
router.post('/users/login', loginUserCon)        // POST /api/users/login

// 👥 User Management (CRUD)
router.post('/users', postusersCon)              // POST /api/users (register)
router.get('/users', getAllUsersCon)             // GET /api/users (list customers)
router.get('/users/:id', getUserByIdCon)         // GET /api/users/:id (get one)
router.put('/users/:id/status', updateUserStatusCon) // PUT /api/users/:id/status
router.delete('/users/:id', deleteUserCon)       // DELETE /api/users/:id
router.put('/users/:id', updateUserCon) 
export default router