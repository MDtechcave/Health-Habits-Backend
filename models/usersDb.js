// import pool from '../pool.js'

// export const postusersDb = async ({ name, email, password, address }) => {
//   const [result] = await pool.query(
//     'INSERT INTO users (name, email, password, address) VALUES (?,?,?,?)',
//     [name, email, password, address]
//   )
//   return result
// }

// // ADD THIS
// export const getUserByEmailDb = async (email) => {
//   const [rows] = await pool.query(
//     'SELECT * FROM users WHERE email = ? LIMIT 1',
//     [email]
//   )
//   return rows[0] || null
// }

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

export const updateUserDb = async (id, userData) => {
  const { name, email, address } = userData

  // Build dynamic SQL for only existing columns
  const updates = []
  const values = []

  if (name !== undefined && name !== null) {
    updates.push('name = ?')
    values.push(name)
  }
  if (email !== undefined && email !== null) {
    updates.push('email = ?')
    values.push(email)
  }
  if (address !== undefined && address !== null) {
    updates.push('address = ?')
    values.push(address)
  }

  if (updates.length === 0) {
    return { message: 'No fields to update' }
  }

  values.push(id)
  const sql = `UPDATE users SET ${updates.join(', ')} WHERE user_id = ?`
  await pool.query(sql, values)

  // Return updated user (without password)
  const [updatedUser] = await pool.query(
    'SELECT user_id AS id, name, email, address FROM users WHERE user_id = ?',
    [id]
  )
  return updatedUser[0]
}