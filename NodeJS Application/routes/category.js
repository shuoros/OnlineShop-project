const express = require("express");
const router = express.Router();
const categoryController = require("../controller/categoryController");
const { verifyToken } = require("../middleware/verification/adminLoginVerify");

router.post("/category/add", verifyToken, categoryController.store);

router.get("/category/:size/:page", categoryController.index);
router.put("/category/edit", verifyToken, categoryController.update);
router.delete("/category/remove", verifyToken, categoryController.destroy);

module.exports = router;
// stor index update destory  show
