const model = require("../model/indexModel");
const { Op } = require("sequelize");
require("dotenv").config();
var controller = {};

// menampilkan semua data
controller.getAll = async function (req, res) {
  try {
    await model.category.findAll().then((result) => {
      if (result.length > 0) {
        res.status(200).json({ message: "connection succed", data: result });
      } else {
        res.status(200).json({ message: "connection succed", data: [] });
      }
    });
  } catch (error) {
    res.send(404).json({ message: error });
  }
};
// mendapatakan data sesuai ID
controller.getId = async function (req, res) {
  try {
    await model.category
      .findAll({
        limit: 1,
        where: { id: req.params.id },
      })
      .then((result) => {
        if (result.length > 0) {
          res.status(200).json({ message: "connection succed", data: result });
        } else {
          res.status(200).json({ message: "connection succed", data: [] });
        }
      });
  } catch (error) {
    res.send(404).json({ message: error });
  }
};
// tambah data
controller.createUser = async function (req, res, file) {
  try {
    const userName = await model.category.findAll({
      where: {
        name: req.body.name,
      },
    });

    if (userName.length > 0) {
      res.status(500).json({ message: "data already in use" });
    } else {
      let category = await model.category.create({
        name: req.body.name,
        userName: req.body.userName,
        password: req.body.password,
        token: req.body.token,
      });
      res.status(201).json({ message: "success", data: category });
    }
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

// edit data
controller.editData = async function (req, res) {
  try {
    let category = await model.category.update(
      {
        name: req.body.name,
        userName: req.body.userName,
        password: req.body.password,
        token: req.body.token,
      },
      {
        where: {
          id: req.body.id,
        },
      }
    );
    res.status(200).json({ message: "success" });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};
// delete data
controller.deleteAt = function (req, res) {
  try {
    let category = model.category.destroy({
      where: {
        id: req.body.id,
      },
    });
    res.status(200).json({ message: "success" });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

module.exports = controller;
