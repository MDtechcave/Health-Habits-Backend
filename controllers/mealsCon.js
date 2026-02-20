import {getmealsDb} from '../models/mealsDb.js'

const getmealsCon = async (req,res) => {
    try {
         const data = await getmealsDb();
          res.json(data);
         }catch(err) {
             res.status(500).json({ error: err.message}); 
            }               
};


export {
    getmealsCon
}