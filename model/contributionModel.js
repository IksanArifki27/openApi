const sequelize = require("sequelize");
const db = require("../config/db");

var contribution = db.define(
  "contribution",
  {
    id: { type: sequelize.INTEGER, primaryKey: true },
    name: { type: sequelize.STRING },
    job: { type: sequelize.STRING },
    imgurl: { type: sequelize.STRING },
    publicid: { type: sequelize.STRING },
    instagram: { type: sequelize.STRING },
    medium: { type: sequelize.STRING },
    github: { type: sequelize.STRING },
    linkedin: { type: sequelize.STRING },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = contribution;
