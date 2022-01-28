const cloudinary = require("cloudinary");
require("dotenv").config();

cloudinary.config({
  cloud_name: "dhfcin27x",
  api_key: "293282187215618",
  api_secret: "Kvbdgq2_yhC12zrP35y0ov6v_DY",
});

module.exports = cloudinary;
