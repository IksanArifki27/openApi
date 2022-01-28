require("dotenv").config();
var sequelize = require("sequelize");

var db = new sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: 'mysql',
    host: process.env.DB_HOST,
  }
);

module.exports = db;
