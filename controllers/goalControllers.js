// controllers/goalController.js
import pool from '../pool.js';

// Get all goals
export const getGoals = async (req, res) => {
  try {
    const [goals] = await pool.query('SELECT * FROM goals');
    
    // Add display info, icons, and images
    const goalsWithInfo = goals.map(goal => ({
      id: goal.goal_id,
      name: goal.goal_type.toLowerCase().replace(/\s+/g, '_'),
      display_name: goal.goal_type,
      description: getGoalDescription(goal.goal_type),
      icon: getGoalIcon(goal.goal_type),
      image_url: getGoalImage(goal.goal_type)
    }));
    
    res.json(goalsWithInfo);
  } catch (error) {
    console.error('Error fetching goals:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get meals by goal (with ingredients and drinks)
export const getMealsByGoal = async (req, res) => {
  try {
    const { goal } = req.params;
    
    // Convert goal name to goal_id
    const goalMap = {
      'weight_loss': 1,
      'muscle_gain': 2,
      'health_maintenance': 3
    };
    
    const goalId = goalMap[goal];
    
    if (!goalId) {
      return res.status(400).json({ error: 'Invalid goal' });
    }

    // Get random meals for this goal with ingredients and drinks
    const [meals] = await pool.query(`
      SELECT 
        m.meal_id,
        m.meal_name,
        m.meal_type,
        m.description,
        m.calories,
        m.carbs,
        m.protein,
        m.goal_id,
        GROUP_CONCAT(DISTINCT i.ingredient_name) AS ingredients,
        GROUP_CONCAT(DISTINCT d.drink_name) AS drinks
      FROM meals m
      LEFT JOIN meal_ingredient mi ON m.meal_id = mi.meal_id
      LEFT JOIN ingredients i ON mi.ingredient_id = i.ingredient_id
      LEFT JOIN meal_drinks md ON m.meal_id = md.meal_id
      LEFT JOIN drinks d ON md.drink_id = d.drink_id
      WHERE m.goal_id = ?
      GROUP BY m.meal_id
      ORDER BY RAND()
      LIMIT 6
    `, [goalId]);

    res.json(meals);
  } catch (error) {
    console.error('Error fetching meals by goal:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get single meal details
export const getMealById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const [meals] = await pool.query(`
      SELECT 
        m.meal_id,
        m.meal_name,
        m.meal_type,
        m.description,
        m.calories,
        m.carbs,
        m.protein,
        GROUP_CONCAT(DISTINCT i.ingredient_name) AS ingredients,
        GROUP_CONCAT(DISTINCT d.drink_name) AS drinks
      FROM meals m
      LEFT JOIN meal_ingredient mi ON m.meal_id = mi.meal_id
      LEFT JOIN ingredients i ON mi.ingredient_id = i.ingredient_id
      LEFT JOIN meal_drinks md ON m.meal_id = md.meal_id
      LEFT JOIN drinks d ON md.drink_id = d.drink_id
      WHERE m.meal_id = ?
      GROUP BY m.meal_id
    `, [id]);

    if (meals.length === 0) {
      return res.status(404).json({ error: 'Meal not found' });
    }

    res.json(meals[0]);
  } catch (error) {
    console.error('Error fetching meal:', error);
    res.status(500).json({ error: error.message });
  }
};

// Helper functions
const getGoalDescription = (goalType) => {
  const descriptions = {
    'Weight Loss': 'Lose weight with calorie-deficit meals',
    'Muscle Gain': 'Build muscle with high-protein meals',
    'Health Maintenance': 'Maintain your current weight with balanced nutrition'
  };
  return descriptions[goalType] || 'Custom meal plan';
};

const getGoalIcon = (goalType) => {
  const icons = {
    'Weight Loss': '',
    'Muscle Gain': '',
    'Health Maintenance': ''
  };
  return icons[goalType] || '';
};

const getGoalImage = (goalType) => {
  const images = {
    'Weight Loss': 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500',
    'Muscle Gain': 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=500',
    'Health Maintenance': 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500'
  };
  return images[goalType] || 'https://via.placeholder.com/500?text=Meal+Plan';
};