const express = require("express");
const router = express.Router();
const adminController = require("../../../controller/admins/root/admin");
const credentialController = require("../../../controller/admins/root/updateCredentials");
const {
    validationForAdminRegister,
} = require("../../../middleware/validations/adminRegisterValidation");
const { verifyToken } = require("../../../middleware/verification/loginVerify");

router.post(
    "/admin/create",
    verifyToken,
    validationForAdminRegister,
    adminController.store
);
router.get("/admin/list/:size/:page", verifyToken, adminController.index);
router.put("/admin/edit", verifyToken, adminController.update);
router.delete("/admin/delete", verifyToken, adminController.destroy);
router.put("/admin/update/credentials", verifyToken, credentialController.update);

module.exports = router;
// stor index update destory  show
