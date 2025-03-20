
const express = require("express");
const { checkout } = require("../controllers/orderController.js");
const authMiddleware = require("../middleware/authMiddleware.js");

const router = express.Router();

router.post("/checkout", authMiddleware, checkout);

module.exports = router;

