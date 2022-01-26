const express = require("express");
const db = require("../models/db");
const multer = require("multer");
const path = require("path");
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

// menampilkan semua data
router.get("/", (req, res) => {
  let sql = "SELECT * FROM artikel";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});
// mendapatakan data sesuai ID
router.get("/:id", (req, res) => {
  const id = req.params.id;
  let sql = "SELECT * FROM artikel WHERE id = ?";
  db.query(sql, id, (err, result) => {
    if (err) {
      res.json({ message: err });
    } else {
      res.send(result);
    }
  });
});
// tambah data
router.post("/", upload.single("imgUrl"), (req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  const shortRiview = req.body.shortRiview;
  const imgUrl = req.body.imgUrl;
  const idCategori = req.body.idCategori;
  const medium = req.body.medium;
  const github = req.body.github;
  const creator = req.body.creator;
  let sql =
    "INSERT INTO artikel(id,title,shortRiview,imgUrl,idCategori,medium,github,creator) VALUES (?,?,?,?,?,?,?,?)";
  db.query(
    sql,
    [id, title, shortRiview, imgUrl, idCategori, medium, github, creator],
    (err, result) => {
      if (err) {
        res.json({ message: err });
      } else {
        res.send(`data telah di tambah kategori ${id}`);
      }
    }
  );
});

// edit data
router.put("/", (req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  const shortRiview = req.body.shortRiview;
  const imgUrl = req.body.imgUrl;
  const idCategori = req.body.idCategori;
  const medium = req.body.medium;
  const github = req.body.github;
  const creator = req.body.creator;
  let sql =
    "UPDATE artikel SET title = ?, shortRiview = ?, imgUrl = ?, idCategori = ?, medium =  ?, github = ?, creator = ? WHERE id = ?";
  db.query(
    sql,
    [title, shortRiview, imgUrl, idCategori, medium, github, creator, id],
    (err, result) => {
      if (err) {
        res.json({ message: err });
      } else {
        res.json(`data berhasil di edit pada id ${id}`);
      }
    }
  );
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  let sql = "DELETE FROM artikel WHERE id = ?";
  db.query(sql, id, (err, result) => {
    if (err) {
      res.json({ message: err });
    } else {
      res.send(`data berhasil di hapus pada id ${id}`);
    }
  });
});

module.exports = router;
