const sequelize = require("sequelize");
const db = require("../config/db");

var category = db.define(
  "category",
  {
    id: { type: sequelize.INTEGER, primaryKey: true },
    namecategory: { type: sequelize.STRING },
    basecolor: { type: sequelize.STRING },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = category;