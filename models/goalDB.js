import pool from '../pool.js'

const getgoalDb = async () => {
  const [data] = await pool.query('SELECT * FROM goals;') 
  return data  
}

export{
    getgoalDb
}

