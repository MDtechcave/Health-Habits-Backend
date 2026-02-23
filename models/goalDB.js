import pool from './pool.js'

const getMealsByGoal = async () => {
  const [data] = await pool.query('SELECT * FROM goals;') 
  return data  
}

export{
    getMealsByGoal
}

