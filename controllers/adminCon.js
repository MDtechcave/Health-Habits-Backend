// controllers/adminCon.js
import { 
  getTotalDb, 
  getRecentOrdersDb 
} from '../models/adminDb.js';

// GET /api/admin/stats
export const getDashboardStats = async (req, res) => {
  try {
    const stats = await getTotalDb();
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch dashboard stats' 
    });
  }
};

// GET /api/admin/orders/recent
export const getRecentOrders = async (req, res) => {
  try {
    const orders = await getRecentOrdersDb(5); // Limit 5
    
    res.json({
      success: true,
      data: orders
    });
  } catch (error) {
    console.error('Recent orders error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch recent orders' 
    });
  }
};