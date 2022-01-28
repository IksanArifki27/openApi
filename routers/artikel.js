const express = require("express");
const controller = require("../controller/indexController");
const router = express.Router();
const image = require("../middleware/storage");

router.get("/", controller.artikel.getAll);
router.get("/:id", controller.artikel.getById);
router.post("/", image.single("foto"), controller.artikel.createNew);
router.put("/", controller.artikel.editAt);
router.delete("/", controller.artikel.deleteAt);

module.exports = router;