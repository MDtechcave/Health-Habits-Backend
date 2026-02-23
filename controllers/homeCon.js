import pool from '../pool.js';

export const getHomeInfo = async (req, res) => {
  try {
    console.log('🔍 Fetching random meals from database...');
    
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
        m.image_url,
        GROUP_CONCAT(DISTINCT i.ingredient_name) AS ingredients,
        GROUP_CONCAT(DISTINCT d.drink_name) AS drinks
      FROM meals m
      LEFT JOIN meal_ingredient mi ON m.meal_id = mi.meal_id
      LEFT JOIN ingredients i ON mi.ingredient_id = i.ingredient_id
      LEFT JOIN meal_drinks md ON m.meal_id = md.meal_id
      LEFT JOIN drinks d ON md.drink_id = d.drink_id
      GROUP BY m.meal_id
      ORDER BY RAND()
      LIMIT 12
    `);

    // Process meals - TRIM spaces from image_url and use database image
    const mealsWithImages = meals.map(meal => {
      // Trim any spaces from the image_url
      const dbImageUrl = meal.image_url ? meal.image_url.trim() : null;
      
      console.log(`🍽️ ${meal.meal_name}:`, {
        meal_id: meal.meal_id,
        hasDbImage: !!dbImageUrl,
        imageUrl: dbImageUrl || 'Using fallback',
        meal_type: meal.meal_type
      });
      
      return {
        ...meal,
        image_url: dbImageUrl || generateMealImage(meal.meal_name, meal.meal_type)
      };
    });

    console.log('✅ Found meals:', mealsWithImages.length);
    res.json(mealsWithImages);
  } catch (error) {
    console.error('❌ Error fetching meals:', error);
    res.status(500).json({ 
      error: error.message,
      stack: error.stack 
    });
  }
};

// Generate fallback food images - USE DIRECT URLS NOT SOURCE API
const generateMealImage = (mealName, mealType) => {
  // Use specific, deterministic Unsplash image IDs (not random)
  const imageMap = {
    'Breakfast': 'photo-1533089862017-5614ec45e25a',
    'Lunch': 'photo-1546069901-ba9599a7e63c',
    'Supper': 'photo-1555939594-58d7cb561ad1',
    'Snack': 'photo-1490645935967-10de6ba17061'
  };

  const imageId = imageMap[mealType] || 'photo-1600891964599-f61ba0e24092';
  
  // Use direct Unsplash URL (not source.unsplash.com which returns random images)
  return `https://images.unsplash.com/${imageId}?w=600`;
};