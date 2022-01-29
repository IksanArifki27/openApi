const artikel = require("./artikelController");
const category = require("./categoryController");
const contribution = require("./contributionController");

const controllers = {};
controllers.artikel = artikel;
controllers.category = category;
controllers.contribution = contribution;

module.exports = controllers;
