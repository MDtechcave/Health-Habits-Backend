import bcrypt from 'bcrypt'
import pool from './pool.js'

const email = 'your-admin@email.com'   
const plainPassword = 'your-password'  

const hashed = await bcrypt.hash(plainPassword, 10)
await pool.query('UPDATE users SET password = ? WHERE email = ?', [hashed, email])
console.log(' Password updated successfully')
process.exit()