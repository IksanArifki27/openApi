const model = require("../model/indexModel");
const { op } = require("sequelize");
const cloudinary = require("../middleware/cloudinaryHelper");

const controller = {};

// tampilkan semua data
controller.getAll = async function (req, res) {
  try {
    await model.contribution
      .findAll({ include: [{ model: model.category }] })
      .then((result) => {
        if (result.length > 0) {
          res.status(200).json({ message: "connection succed", data: result });
        } else {
          res.status(404).json({ message: "data empty", data: [] });
        }
      });
  } catch (error) {
    res.send(404).json({ message: error });
  }
};
// dapat kan data sesuai id
controller.getById = async function (req, res) {
  try {
    await model.contribution
      .findAll({
        where: {
          id: req.params.id,
        },
        limit: 1,
        include: [{ model: model.category }],
      })
      .then((result) => {
        if (result.length > 0) {
          res.status(200).json({ message: "connection succed", data: result });
        } else {
          res.status(404).json({ message: "data empty", data: [] });
        }
      });
  } catch (error) {
    res.send(404).json({ message: error });
  }
};

// tambah data
controller.createNew = async function (req, res, file) {
  try {
    const contributionCheck = await model.contribution.findAll({
      where: {
        id: req.body.id,
      },
    });

    if (contributionCheck.length > 0) {
      res.status(500).json({ message: "data already in use" });
    } else {
      const uploadImage = await cloudinary.uploader.upload(req.file.path, {
        public_id: `${req.body.nama}_profile`,
        width: 500,
        height: 500,
        crop: "fill",
      });

      if (uploadImage) {
        let contribution = await model.contribution.create({
          name: req.body.name,
          job: req.body.job,
          imageurl: uploadImage.url,
          public_id: uploadImage.public_id,
          instagram: req.body.instagram,
          medium: req.body.medium,
          github: req.body.github,
          linkedin: req.body.linkedin,
        });
        res.status(201).json({ message: "success", data: contribution });
      } else {
        res.status(500).json({ message: "failed upload image" });
      }
    }
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

// edit data
controller.editData = async function (req, res) {
  try {
    let artikel = await model.artikel.update(
      {
        name: req.body.name,
        job: req.body.job,
        imageurl: uploadImage.url,
        public_id: uploadImage.public_id,
        instagram: req.body.instagram,
        medium: req.body.medium,
        github: req.body.github,
        linkedin: req.body.linkedin,
      },
      {
        where: {
          id: req.body.id,
        },
      }
    );
    res.status(200).json({ message: "success update data" });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

controller.deleteData = function (req, res) {
  try {
    let artikel = model.artikel.destroy({
      where: {
        id: req.body.id,
      },
    });
    res.status(200).json({ message: "success delete data" });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

module.exports = controller;
