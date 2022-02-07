const sequelize = require("sequelize");
const db = require("../config/db");

var user = db.define(
  "user",
  {
    id: { type: sequelize.INTEGER, primaryKey: true },
    name: { type: sequelize.INTEGER },
    userName: { type: sequelize.INTEGER },
    password: { type: sequelize.INTEGER },
    token: { type: sequelize.INTEGER },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = user;
