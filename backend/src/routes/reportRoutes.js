// backend/src/routes/reportRoutes.js
const express = require('express');
const router = express.Router();
const {
    getDailyRevenue,
    getTopSpenders,
    getSalesByCategory,
} = require('../controllers/reportController');


router.get('/daily-revenue', getDailyRevenue);
router.get('/top-spenders', getTopSpenders);
router.get('/sales-by-category', getSalesByCategory);

module.exports = router;