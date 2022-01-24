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
exports.LogoutController = void 0;
const logout_service_1 = require("../services/logout-service");
class LogoutController {
    static logout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { refreshToken } = req.cookies;
                const token = yield logout_service_1.LogoutService.logout(refreshToken);
                res.clearCookie("refreshToken");
                res.clearCookie("username");
                res.clearCookie("role");
                return res.json(token);
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.LogoutController = LogoutController;
//# sourceMappingURL=logout-controller.js.map