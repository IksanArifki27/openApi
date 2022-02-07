const express = require("express");
const controller = require("../controller/indexController");
const router = express.Router();

router.get("/", controller.user.getAll);
router.get("/:id", controller.user.getId);
router.post("/", controller.user.createUser);
router.put("/", controller.user.editData);
router.put("/:id", controller.user.deleteAt);

module.exports = router;
