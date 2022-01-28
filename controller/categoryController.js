const model = require("../model/indexModel");
const { Op } = require("sequelize");
require("dotenv").config();
var controller = {};

// menampilkan semua data
controller.getCategory = async function (req, res) {
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
controller.findById = async function (req, res) {
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
controller.createNew = async function (req, res, file) {
  try {
    const categoryCheck = await model.category.findAll({
      where: {
        namecategory: req.body.namecategory,
      },
    });

    if (categoryCheck.length > 0) {
      res.status(500).json({ message: "data already in use" });
    } else {
      let category = await model.category.create({
        namecategory: req.body.namecategory,
        basecolor: req.body.basecolor,
      });
      res.status(201).json({ message: "success", data: category });
    }
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

// edit data
controller.editAt = async function (req, res) {
  try {
    let category = await model.category.update(
      {
        namecategory: req.body.namecategory,
        basecolor: req.body.basecolor,
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
