import mysql from "mysql2/promise";


const pool = mysql.createPool({

  user: 'root',
  host: 'localhost',
  password: 'Aviwe',
  database: 'healthy_habits_db'
});

pool.getConnection()
  .then(() => console.log("It's working "))
  .catch(err => console.error("It's not working ", err));

  export default pool;

// console.log()