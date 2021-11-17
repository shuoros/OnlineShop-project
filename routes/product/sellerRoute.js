const express = require("express");
const router = express.Router();
const productController = require("../../controller/seller/productController");
const { verifyToken } = require("../../middleware/verification/loginVerify");

router.post("/product/add", verifyToken, productController.store);
router.put("/product/update", verifyToken, productController.update);
router.delete("/product/remove", verifyToken, productController.destroy);

module.exports = router;
// stor index update destory  show
