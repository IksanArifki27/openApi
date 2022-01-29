const express = require("express");
const controller = require("../controller/indexController");
const router = express.Router();
const image = require("../middleware/storage");

router.get("/", controller.contribution.getAll);
router.get("/:id", controller.contribution.getById);
router.post("/", image.single("foto"), controller.contribution.createNew);
router.put("/", controller.contribution.editData);
router.delete("/:id", controller.contribution.deleteData);

module.exports = router;
