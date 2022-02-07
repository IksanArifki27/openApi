const artikel = require("./artikelModel");
const category = require("./categoryModel");
const contribution = require("./contributionModel");
const user = require("./userModel");

const model = {};

model.artikel = artikel;
model.category = category;
model.contribution = contribution;
model.user = user;

module.exports = model;
