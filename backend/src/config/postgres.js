const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.POSTGRES_URI, {
  dialect: "postgres",
  logging: false,
});

const connectPostgres = async () => {
  try {
    await sequelize.authenticate();
    console.log(" PostgreSQL Connected");
    await sequelize.sync({ alter: true });
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error(" PostgreSQL Connection Error:", error);
  }
};

module.exports = { sequelize, connectPostgres };