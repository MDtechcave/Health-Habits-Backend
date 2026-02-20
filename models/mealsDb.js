import pool from '../pool.js'

const getmealsDb = async () => {
    const [data] = await pool.query ('SELECT * FROM meals')
    return data
}

export {
    getmealsDb
}