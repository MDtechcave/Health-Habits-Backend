// routes/auth.routes.js
import express from 'express';
import { loginCon } from '../controllers/authCon.js';

const router = express.Router();

// POST /api/auth/login
router.post('/login', loginCon);

console.log('Auth router created:', typeof router)
export default router;