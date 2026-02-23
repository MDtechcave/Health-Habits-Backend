import { getdrinksDb } from "../models/drinksDb.js";

const getdrinksCon = async (req,res) => {
    try {
        const data = await getdrinksDb();
         res.json(data); 
        }catch(err) {
            res.status(500).json({ error: err.message}); 
    }
};

export {
    getdrinksCon
}