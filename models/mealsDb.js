import pool from '../pool.js';

// GET ALL
export const getmealsDb = async () => {
  const [data] = await pool.query('SELECT * FROM meals');
  return data;
};

// ADD
export const addMealDb = async (meal) => {
  // 🔥 Include goal_id with a default value (e.g., 2)
  const sql = `
    INSERT INTO meals
    (goal_id, meal_name, meal_type, description, image_url, calories, carbs, protein)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const DEFAULT_GOAL_ID = 2; // ← Change to your desired default

  const [result] = await pool.query(sql, [
    DEFAULT_GOAL_ID,  // 🔥 Auto-assigned backend-side
    meal.meal_name,
    meal.meal_type,
    meal.description || null,
    meal.image_url || null,
    meal.calories,
    meal.carbs,
    meal.protein
  ]);

  const [newMeal] = await pool.query(
    "SELECT * FROM meals WHERE meal_id = ?",
    [result.insertId]
  );

  return newMeal[0];
};
// DELETE
export const deleteMealDb = async (id) => {
  await pool.query("DELETE FROM meals WHERE meal_id = ?", [id]);
};