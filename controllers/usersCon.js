import bcrypt from 'bcrypt'
import { postusersDb, getUserByEmailDb } from '../models/usersDb.js'

// REGISTER
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

// LOGIN
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

    // Return user without password
    const { password: _, ...safeUser } = user
    res.json({ message: 'Login successful', user: safeUser })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

