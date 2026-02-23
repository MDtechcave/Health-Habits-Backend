import pool from '../pool.js'

const getdrinksDb = async () => {
    const [data] = await pool.query ('SELECT * FROM drinks')
    return data
}

export {
    getdrinksDb
}