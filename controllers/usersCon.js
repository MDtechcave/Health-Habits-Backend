import bcrypt from 'bcrypt'
import { 
  postusersDb, 
  getUserByEmailDb,
  getAllUsersDb,
  getUserByIdDb,
  updateUserStatusDb,
  deleteUserDb,
  updateUserDb
} from '../models/usersDb.js'

// REGISTER — customers only
export const postusersCon = async (req, res) => {
  try {
    const { name, email, password, address } = req.body

    if (!name || !email || !password || !address) {
      return res.status(400).json({ error: 'All fields are required' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const data = await postusersDb({ name, email, password: hashedPassword, address })

    res.json({ message: 'User created!', data })
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Email already exists' })
    }
    res.status(500).json({ error: err.message })
  }
}

// LOGIN — handles both USER and ADMIN
export const loginUserCon = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' })
    }

    const user = await getUserByEmailDb(email)
    
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' })
    }

    const match = await bcrypt.compare(password, user.password)
    
    if (!match) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' })
    }

    const { password: _, ...safeUser } = user

    res.json({
      success: true,
      message: 'Login successful',
      user: {
        id: safeUser.user_id,
        name: safeUser.name,
        email: safeUser.email,
        role: safeUser.role  // 'USER' or 'ADMIN' — comes from DB
      }
    })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

export const getAllUsersCon = async (req, res) => {
  try {
    const users = await getAllUsersDb()
    res.json(users)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}


// ===============================
// GET USER BY ID
// ===============================
export const getUserByIdCon = async (req, res) => {
  try {
    const { id } = req.params

    const user = await getUserByIdDb(id)

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.json(user)

  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}


// ===============================
// UPDATE USER STATUS
// ===============================
export const updateUserStatusCon = async (req, res) => {
  try {
    const { id } = req.params
    const { status } = req.body

    const updated = await updateUserStatusDb(id, status)

    res.json({
      message: 'User status updated',
      updated
    })

  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}


// ===============================
// DELETE USER
// ===============================
export const deleteUserCon = async (req, res) => {
  try {
    const { id } = req.params

    await deleteUserDb(id)

    res.json({
      message: 'User deleted successfully'
    })

  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// ===============================
// UPDATE USER PROFILE
// ===============================


// ✅ FIXED - UPDATE USER PROFILE
export const updateUserCon = async (req, res) => {
  try {
    const { id } = req.params  // ✅ This should be numeric user_id
    
    // ✅ Convert id to number to ensure proper comparison
    const userId = parseInt(id)
    if (isNaN(userId)) {
      return res.status(400).json({ error: 'Invalid user ID' })
    }
    
    const { name, email, address } = req.body

    // ✅ Check email uniqueness - compare numeric IDs
    if (email) {
      const existing = await getUserByEmailDb(email)
      // ✅ Use == for loose comparison or convert both to numbers
      if (existing && existing.id != userId) {
        return res.status(400).json({ error: 'Email already in use' })
      }
    }

    const updatedUser = await updateUserDb(userId, {
      name,
      email,
      address
    })

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: updatedUser
    })

  } catch (err) {
    console.error('Update profile error:', err)
    
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Email already exists' })
    }
    
    res.status(500).json({ error: err.message })
  }
}