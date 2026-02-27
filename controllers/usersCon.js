import bcrypt from 'bcrypt'
import { 
  postusersDb, 
  getUserByEmailDb,
  getAllUsersDb,
  getUserByIdDb,
  updateUserStatusDb,
  deleteUserDb
} from '../models/usersDb.js'

// ==================== REGISTER ====================
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

// ==================== LOGIN ====================
export const loginUserCon = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }

    const user = await getUserByEmailDb(email)
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    const match = await bcrypt.compare(password, user.password)
    
    if (!match) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    const { password: _, ...safeUser } = user
    res.json({ message: 'Login successful', user: safeUser })
    
  } catch (err) {
    console.error('Login error:', err)
    res.status(500).json({ error: 'Server error. Please try again.' })
  }
}

// ==================== GET ALL USERS ====================
export const getAllUsersCon = async (req, res) => {
  try {
    const users = await getAllUsersDb()
    res.json(users)
  } catch (err) {
    console.error('Error fetching users:', err)
    res.status(500).json({ error: 'Failed to fetch users' })
  }
}

// ==================== GET USER BY ID ====================
export const getUserByIdCon = async (req, res) => {
  try {
    const { id } = req.params
    const user = await getUserByIdDb(id)
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    
    res.json(user)
  } catch (err) {
    console.error('Error fetching user:', err)
    res.status(500).json({ error: 'Failed to fetch user' })
  }
}

// ==================== UPDATE USER STATUS ====================
export const updateUserStatusCon = async (req, res) => {
  try {
    const { id } = req.params
    const { status } = req.body
    
    if (!status || !['active', 'inactive'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' })
    }
    
    await updateUserStatusDb(id, status)
    res.json({ message: 'Status updated successfully' })
  } catch (err) {
    console.error('Error updating status:', err)
    res.status(500).json({ error: 'Failed to update status' })
  }
}

// ==================== DELETE USER ====================
export const deleteUserCon = async (req, res) => {
  try {
    const { id } = req.params
    await deleteUserDb(id)
    res.json({ message: 'User deleted successfully' })
  } catch (err) {
    console.error('Error deleting user:', err)
    res.status(500).json({ error: 'Failed to delete user' })
  }
}