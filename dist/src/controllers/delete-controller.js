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
exports.DeleteController = void 0;
const delete_service_1 = require("../services/delete-service");
class DeleteController {
    static delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { refreshToken } = req.cookies;
                const { userId } = req.body;
                const userData = yield delete_service_1.DeleteService.delete(refreshToken, userId);
                res.clearCookie("refreshToken");
                res.clearCookie("username");
                res.clearCookie("role");
                return res.json(userData);
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.DeleteController = DeleteController;
//# sourceMappingURL=delete-controller.js.map