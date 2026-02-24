import {getgoalDb} from '../models/goalDB.js'

const getgoalCon = async (req,res) => {
  try{
    const data = await getgoalDb();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message});
  }
};

export{
  getgoalCon
}