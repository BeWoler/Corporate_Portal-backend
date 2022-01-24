"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRouter = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const admin_changeUserPassword_controller_1 = require("../AdminControllers/admin-changeUserPassword-controller");
const admin_deleteUser_controller_1 = require("../AdminControllers/admin-deleteUser-controller");
const admin_editUser_controller_1 = require("../AdminControllers/admin-editUser-controller");
const admin_registration_controller_1 = require("../AdminControllers/admin-registration-controller");
const admin_changeUserAvatar_controller_1 = require("../AdminControllers/admin-changeUserAvatar-controller");
const auth_middleware_1 = __importDefault(require("../../middlewares/auth-middleware"));
const multerMiddleware = require("../../middlewares/multer-middleware");
process.setMaxListeners(0);
exports.adminRouter = (0, express_1.Router)();
exports.adminRouter.post("/avatar", auth_middleware_1.default, admin_changeUserAvatar_controller_1.AdminChangeUserAvatarController.save);
exports.adminRouter.patch("/editInfo", auth_middleware_1.default, admin_editUser_controller_1.AdminEditUserController.editUser);
exports.adminRouter.post("/delete", auth_middleware_1.default, admin_deleteUser_controller_1.AdminDeleteUserController.delete);
exports.adminRouter.post("/registration", (0, express_validator_1.body)("email").isEmail(), (0, express_validator_1.body)("password").isLength({ min: 3, max: 16 }), auth_middleware_1.default, admin_registration_controller_1.AdminRegistrationController.registration);
exports.adminRouter.patch("/changePassword", (0, express_validator_1.body)("newPassword").isLength({ min: 3, max: 16 }), auth_middleware_1.default, admin_changeUserPassword_controller_1.AdmiChangeUserPasswordController.edit);
exports.adminRouter.post("/upload", multerMiddleware.single("image"), (req, res) => {
    res.json({ path: req.file.path });
});
//# sourceMappingURL=routes.js.map