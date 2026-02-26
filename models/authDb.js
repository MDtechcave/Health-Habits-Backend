// models/authDb.js
import pool from '../pool.js';

export const loginDb = async ({ email, password, role }) => {
  console.log('🔎 [authDb] Starting database query...');
  console.log('🔎 [authDb] Parameters:', { email, role });

  try {
    const [rows] = await pool.query(
      `SELECT user_id, name, email, password, role 
       FROM users 
       WHERE (email = ? OR name = ?) 
       AND password = ? 
       AND role = ? 
       LIMIT 1`,
      [email, email, password, role]
    );

    console.log('[authDb] Raw result:', rows);
    console.log('[authDb] First row:', rows[0]);

    return rows[0] || null;

  } catch (error) {
    console.error(' [authDb] Database error:', {
      name: error.name,
      message: error.message,
      code: error.code,
      sql: error.sql
    });
    throw error; // Re-throw to controller
  }
};