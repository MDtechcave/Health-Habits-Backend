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
    'SELECT * FROM users WHERE email = ? LIMIT 1',
    [email]
  )
  return rows[0] || null
}
