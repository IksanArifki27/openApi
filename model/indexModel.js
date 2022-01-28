const artikel = require("./artikelModel");
const category = require("./categoryModel");
const contribution = require("./contributionModel");

const model = {};

model.artikel = artikel;
model.category = category;
model.contribution = contribution;

module.exports = model;