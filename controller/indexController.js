const artikel = require("./artikelController");
const category = require("./categoryController");

const controllers = {}
controllers.artikel = artikel;
controllers.category = category;

module.exports = controllers;