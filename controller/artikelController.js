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
controller.getNew = async function (req, res) {
  try {
    await model.artikel
      .findAll({
        limit: 4,
        include: [{ model: model.category }],
        order: ["id", "DESC"],
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
// mendapatakan data sesuai ID
controller.getById = async function (req, res) {
  try {
    await model.artikel
      .findAll({
        where: {
          id: req.params.id,
        },
        limit: 1,
        include: [{ model: model.category, required: true }],
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
        imgurl: uploadImage.url,
        publicid: uploadImage.public_id,
        idcategory: req.body.idcategory,
        medium: req.body.medium,
        github: req.body.github,
        creator: req.body.creator,
      });
      res.status(201).json({ message: "success", data: artikel });
    } else {
      res.status(500).json({ message: "failed upload image" });
    }
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

// edit data
controller.editAt = async function (req, res) {
  try {
    var data = await model.artikel.findAll({
      where: {
        id: req.body.id,
      },
      include: [{ model: model.category }],
    });
    var cekCategory = await model.category.findAll({
      where: {
        id: req.body.idcategory,
      },
    });
    if (data.length > 0 && cekCategory.length > 0) {
      if (!req.file) {
        await model.artikel.update(
          {
            title: req.body.title,
            shortreview: req.body.shortreview,
            imgurl: data[0].imgurl,
            publicid: data[0].publicid,
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
        res.status(201).json({
          message: "success",
          data: {
            title: req.body.title,
            shortreview: req.body.shortreview,
            imgurl: data[0].imgurl,
            publicid: data[0].publicid,
            idcategory: req.body.idcategory,
            medium: req.body.medium,
            github: req.body.github,
            creator: req.body.creator,
          },
        });
      } else {
        const uploadImage = await cloudinary.uploader.upload(req.file.path, {
          public_id: `${req.body.nama}_profile`,
          width: 500,
          height: 500,
          crop: "fill",
        });
        if (uploadImage) {
          await model.artikel.update(
            {
              title: req.body.title,
              shortreview: req.body.shortreview,
              imgurl: uploadImage.url,
              publicid: uploadImage.public_id,
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
          res.status(201).json({
            message: "success",
            data: {
              title: req.body.title,
              shortreview: req.body.shortreview,
              imgurl: uploadImage.url,
              publicid: uploadImage.public_id,
              idcategory: req.body.idcategory,
              medium: req.body.medium,
              github: req.body.github,
              creator: req.body.creator,
            },
          });
        } else {
          res.status(500).json({ message: "failed upload image" });
        }
      }
    } else {
      res.status(404).json({ message: "data empty", data: [] });
    }
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

module.exports = controller;
