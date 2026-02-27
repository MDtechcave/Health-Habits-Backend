
import pool from '../pool.js'

// Always registers as USER — admins are created directly in the DB
export const postusersDb = async ({ name, email, password, address }) => {
  const [result] = await pool.query(
    'INSERT INTO users (name, email, password, address, role) VALUES (?,?,?,?,?)',
    [name, email, password, address, 'USER']
  )
  return result
}

export const getUserByEmailDb = async (email) => {
  const [rows] = await pool.query(
    'SELECT user_id AS id, name, email, role, password, status, address FROM users WHERE email = ? LIMIT 1',
    [email]
  )
  return rows[0] || null
}

export const getAllUsersDb = async () => {
  const [rows] = await pool.query(`
    SELECT user_id AS id, name, email, role, status
    FROM users
    WHERE role != 'ADMIN'
  `)
  return rows
}

export const getUserByIdDb = async (id) => {
  const [rows] = await pool.query(
    'SELECT user_id AS id, name, email, role, status, address, created_at FROM users WHERE user_id = ?',
    [id]
  )
  return rows[0] || null
}

export const updateUserStatusDb = async (id, status) => {
  await pool.query(
    'UPDATE users SET status = ? WHERE user_id = ?',
    [status, id]
  )
}

export const deleteUserDb = async (id) => {
  await pool.query('DELETE FROM users WHERE user_id = ?', [id])
}
