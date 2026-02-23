import pool from '../pool.js';

export const postsubscriptionDb = async ({user_id,package_id,start_date,status}) => {

    const [result] = await pool.query (
        "INSERT INTO subscription(user_id,package_id,start_date,status) VALUES (?,?,?,?)",
        [user_id,package_id,start_date,status]
    );
    return result;
};