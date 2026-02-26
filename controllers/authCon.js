// controllers/authCon.js
import { loginDb } from '../models/authDb.js';

export const loginCon = async (req, res) => {
  console.log(' ========== LOGIN ATTEMPT ==========');
  console.log(' Request body:', JSON.stringify(req.body, null, 2));
  console.log(' Request headers:', req.headers);

  try {
    const { email, password, role } = req.body;

    // Validate required fields
    if (!email || !password || !role) {
      console.warn('Missing fields:', { 
        email: !!email, 
        password: !!password, 
        role: !!role 
      });
      return res.status(400).json({
        success: false,
        message: `Missing fields: ${!email ? 'email ' : ''}${!password ? 'password ' : ''}${!role ? 'role' : ''}`.trim()
      });
    }

    console.log('Querying database with:', { email, role });

    // Query database
    const user = await loginDb({ email, password, role });

    console.log('Database result:', user ? 'User found' : 'No user found');

    if (!user) {
      return res.json({
        success: false,
        message: 'Invalid credentials or role mismatch'
      });
    }

    console.log('Login successful for user ID:', user.user_id);

    // Return user info (exclude password)
    res.json({
      success: true,
      message: 'Login successful',
      user: {
        id: user.user_id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    // FULL ERROR DETAILS
    console.error('========== LOGIN ERROR ==========');
    console.error(' Error name:', error.name);
    console.error(' Error message:', error.message);
    console.error(' Error code:', error.code);
    console.error(' Error SQL:', error.sql);
    console.error(' Error stack:', error.stack);
    console.error(' ==================================');

    res.status(500).json({
      success: false,
      message: 'Server error during login',
      debug: error.message  // Remove in production
    });
  }
};