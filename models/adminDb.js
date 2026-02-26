import pool from '../pool.js'

export const getTotalDb = async() =>{
    const[customers] = await pool.query(
         'SELECT COUNT(*) as count FROM users WHERE role = "USER"'
    )

    const[meals] = await pool.query(
        'SELECT COUNT(*) as count FROM meals')

    
    const[orders] = await pool.query(
        'SELECT COUNT(*) as count FROM orders')
     
    return {
    totalCustomers: customers[0]?.count || 0,
    totalMeals: meals[0]?.count || 0,
    totalOrders: orders[0]?.count || 0
  };
};

// Get 5 most recent orders with user info
export const getRecentOrdersDb = async (limit = 5) => {
  const [rows] = await pool.query(
    `SELECT 
       o.order_id,
       o.user_id,
       u.name as customer_name,
       o.total_amount,
       o.status,
       o.created_at,
       o.delivery_address
     FROM orders o
     LEFT JOIN users u ON o.user_id = u.user_id
     ORDER BY o.created_at DESC
     LIMIT ?`,
    [limit]
  );
  
  // Format dates for frontend
  return rows.map(order => ({
    ...order,
    created_at: new Date(order.created_at).toLocaleDateString('en-ZA', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    })
}))
};