const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root", // ganti sesuai user db mysql
  password: "", // ganti sesuai password mysql
  database: "restapi",
});

db.connect((err) => {
  if (err) throw err;
  console.log("DB connect");
});

module.exports = db;
