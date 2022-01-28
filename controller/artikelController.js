const model = require("../model/indexModel");
const { op } = require("sequelize");
const cloudinary = require("../middleware/cloudinaryHelper");

const controller = {};

// menampilkan semua data
controller.getAll = async function (req, res) {
  try {
    await model.artikel
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
// mendapatakan data sesuai ID
controller.getById = async function (req, res) {
  try {
    await model.artikel
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
    const artikelCheck = await model.artikel.findAll({
      where: {
        id: req.body.id,
      },
    });

    if (artikelCheck.length > 0) {
      res.status(500).json({ message: "data already in use" });
    } else {
      const uploadImage = await cloudinary.uploader.upload(req.file.path, {
        public_id: `${req.body.nama}_profile`,
        width: 500,
        height: 500,
        crop: "fill",
      });

      if (uploadImage) {
        let artikel = await model.artikel.create({
          title: req.body.title,
          shortreview: req.body.shortreview,
          imageurl: uploadImage.url,
          public_id: uploadImage.public_id,
          idcategory: req.body.idcategory,
          medium: req.body.medium,
          github: req.body.github,
          creator: req.body.creator,
        });
        res.status(201).json({ message: "success", data: artikel });
      } else {
        res.status(500).json({ message: "failed upload image" });
      }
    }
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

// edit data
controller.editAt = async function (req, res) {
  try {
    let artikel = await model.artikel.update(
      {
        title: req.body.title,
        shortreview: req.body.shortreview,
        imageurl: uploadImage.url,
        public_id: uploadImage.public_id,
        idcategory: req.body.idcategory,
        medium: req.body.medium,
        github: req.body.github,
        creator: req.body.creator,
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
    let artikel = model.artikel.destroy({
      where: {
        id: req.body.id,
      },
    });
    res.status(200).json({ message: "success" });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

module.exports = controller
