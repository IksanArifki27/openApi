const express = require("express");
const controller = require("../controller/indexController");
const router = express.Router();

router.get("/", controller.category.getCategory);
router.get("/:id", controller.category.findById);
router.post("/", controller.category.createNew);
router.put("/", controller.category.editAt);
router.delete("/", controller.category.deleteAt);

module.exports = router;
