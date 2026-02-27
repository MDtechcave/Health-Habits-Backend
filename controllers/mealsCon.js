import {
  getmealsDb,
  addMealDb,
  deleteMealDb
} from '../models/mealsDb.js';

// GET
export const getmealsCon = async (req, res) => {
  try {
    const data = await getmealsDb();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ADD
export const addMealCon = async (req, res) => {
  try {
    console.log("📥 Headers:", req.headers);
    console.log("📥 Body:", req.body);
    
    // 🔥 Safety check - return error if body is missing
    if (!req.body || typeof req.body !== 'object') {
      return res.status(400).json({ 
        error: "Invalid request: body must be JSON",
        received: req.body 
      });
    }
    
    const newMeal = await addMealDb(req.body);
    res.status(201).json(newMeal);
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ 
      error: err.message,
      code: err.code 
    });
  }
};

// DELETE
export const deleteMealCon = async (req, res) => {
  try {
    await deleteMealDb(req.params.id);
    res.json({ message: "Meal deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};