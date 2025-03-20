// backend/src/controllers/reportController.js
const db = require('../config/db'); // Adjust the path as necessary
const Order = require('../models/sql/Order'); // Your Order model

// Get daily revenue for the last 7 days
const getDailyRevenue = async (req, res) => {
    try {
        const result = await db.query(`
            SELECT 
                DATE(order_date) AS date,
                SUM(total_amount) AS revenue
            FROM 
                orders
            WHERE 
                order_date >= NOW() - INTERVAL 7 DAY
            GROUP BY 
                DATE(order_date)
            ORDER BY 
                DATE(order_date);
        `);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get top spenders
const getTopSpenders = async (req, res) => {
    try {
        const result = await db.query(`
            SELECT 
                user_id,
                SUM(total_amount) AS total_spent
            FROM 
                orders
            GROUP BY 
                user_id
            ORDER BY 
                total_spent DESC
            LIMIT 10;
        `);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get sales by category
const getSalesByCategory = async (req, res) => {
    try {
        const result = await Order.aggregate([
            {
                $group: {
                    _id: "$category",
                    totalSales: { $sum: "$total_amount" }
                }
            }
        ]);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getDailyRevenue,
    getTopSpenders,
    getSalesByCategory,
};