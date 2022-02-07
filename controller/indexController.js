const artikel = require("./artikelController");
const category = require("./categoryController");
const contribution = require("./contributionController");
const user = require("./userController");

const controllers = {};
controllers.artikel = artikel;
controllers.category = category;
controllers.contribution = contribution;
controllers.user = user;
module.exports = controllers;
