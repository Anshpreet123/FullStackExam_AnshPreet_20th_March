require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectPostgres } = require("./config/postgres");
const { connectMongo } = require("./config/mongo");
const db = require("./config/db"); // Import the db configuration

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

// Database Connections
connectPostgres();
connectMongo();

// Sync Sequelize models with the database
const syncDatabase = async () => {
  try {
    await db.sequelize.sync({ force: true });
    console.log("Database synchronized successfully.");
  } catch (error) {
    console.error("Error synchronizing database:", error);
  }
};

syncDatabase();

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/cart", require("./routes/cartRoutes"));
app.use("/api/reports" , require("./routes/reportRoutes"))

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
