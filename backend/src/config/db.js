const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(process.env.POSTGRES_URI, { logging: false });

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Import models (Pass sequelize & DataTypes)
db.Order = require("../models/sql/Order")(sequelize, DataTypes); // ✅ Correct
db.OrderItem = require("../models/sql/OrderItem")(sequelize, DataTypes); // ✅ Correct

module.exports = db;
