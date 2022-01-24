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
exports.LoginController = void 0;
const login_service_1 = require("../services/login-service");
class LoginController {
    static login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password } = req.body;
                const userData = yield login_service_1.LoginService.login(username, password);
                res.cookie("refreshToken", userData.refreshToken, {
                    maxAge: 2 * 24 * 60 * 60 * 1000,
                    httpOnly: true,
                });
                res.cookie("username", userData.user.username, {
                    maxAge: 2 * 24 * 60 * 60 * 1000,
                    httpOnly: true,
                });
                res.cookie("role", userData.user.role, {
                    maxAge: 2 * 24 * 60 * 60 * 1000,
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
exports.LoginController = LoginController;
//# sourceMappingURL=login-controller.js.map