// import express from 'express';
// import cors from 'cors';
// import pool from './pool.js';



// const app = express ()

// app.use(cors());
// app.use(express.json());


// // Routes
// app.get('/', async (req, res)=> {
//     try{
//         const[meals] = await pool.query ('SELECT * FROM meals');
//         const[drinks] = await pool.query ('SELECT * FROM drinks');
//         const[goals] = await pool.query ('SELECT *FROM goals');
//         const[meal_drinks] = await pool.query ('SELECT * FROM meal_drinks');
//         const [meal_ingredient] =await pool.query ('SELECT * FROM meal_ingredient');
//         const[ingredients] = await pool.query ('SELECT * FROM ingredients');
//         const[orders] = await pool.query ('SELECT * FROM orders');
//         const[package_meals] = await pool.query('SELECT * FROM package_meals');
//         const[payments] = await pool.query('SELECT * FROM payments');
//         const[questionaire] = await pool.query('SELECT * FROM questionaire');
//         const[subscription] = await pool.query('SELECT * FROM subscription');
//         const[users] = await pool.query('SELECT *FROM users');
//         const[weekly_packages] = await pool .query ('SELECT * FROM weekly_packages')



//         res.json({meals, drinks,goals,meal_drinks,ingredients,orders,package_meals,payments,questionaire,subscription,users,weekly_packages});
//     } catch(err) {
//         res.status(500).json(err);
//     }
// });




// const PORT = 2534;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });


