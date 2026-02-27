import pool from '../pool.js'

// Get total counts for dashboard
export const getTotalDb = async () => {
  try {
    const [customers] = await pool.query(
      'SELECT COUNT(*) as count FROM users WHERE role = "USER"'
    )
    const [meals] = await pool.query(
      'SELECT COUNT(*) as count FROM meals'
    )
    const [orders] = await pool.query(
      'SELECT COUNT(*) as count FROM orders'
    )

    return {
      totalCustomers: customers[0]?.count || 0,
      totalMeals: meals[0]?.count || 0,
      totalOrders: orders[0]?.count || 0
    }
  } catch (error) {
    console.error('[adminDb] getTotalDb error:', error)
    throw error
  }
}

// Get 5 most recent orders (without user info)
export const getRecentOrdersDb = async (limit = 5) => {
  try {
    const [rows] = await pool.query(
      `SELECT 
         order_id,
         sub_id,
         order_date,
         amount,
         order_status
       FROM orders
       ORDER BY order_date DESC
       LIMIT ?`,
      [limit]

)

    // Format dates for frontend
    return rows.map(order => ({
      ...order,
      order_date: new Date(order.order_date).toLocaleDateString('en-ZA', {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
      })
    }))
  } catch (error) {
    console.error('[adminDb] getRecentOrdersDb error:', error)
    throw error
  }
}