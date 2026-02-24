// import express from 'express'
// import {config} from 'dotenv'
// import mysql from "mysql2/promise";
// config()

// const pool = mysql.createPool({

//   user: process.env.USER,
//   host: process.env.HOST,
//   password:process.env.PASSWORD,
//   database: process.env.DATABASE,
//   waitForConnections: true,
//   connectionLimit: 10,
// });


// const app = express()
// // const PORT = process.env.PORT

//   export default pool;

import { config } from "dotenv";
import mysql from "mysql2/promise";
config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
});

export default pool;