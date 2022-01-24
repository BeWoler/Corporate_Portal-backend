"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditUserController = void 0;
const editUser_service_1 = require("../services/editUser-service");
class EditUserController {
    static editUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.body.userId;
                const userInfo = req.body.userInfo;
                const userData = yield editUser_service_1.EditUserService.editUser(userId, Object.assign({}, userInfo));
                res.cookie("refreshToken", userData.refreshToken, {
                    maxAge: 2 * 24 * 60 * 60 * 1000,
                    sameSite: "none",
                    secure: true,
                    httpOnly: true,
                });
                res.cookie("username", userData.user.username, {
                    maxAge: 2 * 24 * 60 * 60 * 1000,
                    sameSite: "none",
                    secure: true,
                    httpOnly: true,
                });
                res.cookie("role", userData.user.role, {
                    maxAge: 2 * 24 * 60 * 60 * 1000,
                    sameSite: "none",
                    secure: true,
                    httpOnly: true,
                });
                return res.json(userData);
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.EditUserController = EditUserController;
//# sourceMappingURL=editUser-controller.js.map