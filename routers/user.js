const express = require("express");
const db = require("../models/db");
const router = express.Router();

// menampilkan semua data
router.get("/", (req, res) => {
  let sql = "SELECT * FROM category";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});
// mendapatakan data sesuai ID
router.get("/:id", (req, res) => {
  const id = req.params.id;
  let sql = "SELECT * FROM user WHERE id = ?";
  db.query(sql, id, (err, result) => {
    if (err) {
      res.json({ message: err });
    } else {
      res.send(result);
    }
  });
});
// tambah data
router.post("/", (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const userName = req.body.userName;
  const password = req.body.password;
  const token = req.body.token;

  let sql =
    "INSERT INTO user(id,name,username,password,token) VALUES (?,?,?,?,?)";
  db.query(sql, [id, name, userName, password, token], (err, result) => {
    if (err) {
      res.json({ message: err });
    } else {
      res.send(`data telah di tambah kategori ${id}`);
    }
  });
});

// edit data
router.put("/", (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const userName = req.body.userName;
  const password = req.body.password;
  const token = req.body.token;
  let sql =
    "UPDATE user SET name = ?, userName = ?,password = ?, token =? WHERE id = ?";
  db.query(sql, [name, userName, password, token, id], (err, result) => {
    if (err) {
      res.json({ message: err });
    } else {
      res.json(`data berhasil di edit pada id ${id}`);
    }
  });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  let sql = "DELETE FROM user WHERE id = ?";
  db.query(sql, id, (err, result) => {
    if (err) {
      res.json({ message: err });
    } else {
      res.send(`data berhasil di hapus pada id ${id}`);
    }
  });
});

module.exports = router;
