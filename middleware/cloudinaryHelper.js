const cloudinary = require("cloudinary");
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.R_NAME,
  api_key: process.env.R_KEY,
  api_secret: process.env.R_SECRET,
});

module.exports = cloudinary;
