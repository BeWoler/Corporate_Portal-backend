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
exports.AdmiChangeUserPasswordController = void 0;
const admin_changeUserPassword_service_1 = require("../AdminServices/admin-changeUserPassword-service");
const express_validator_1 = require("express-validator");
const api_error_1 = require("../../exceptions/api-error");
class AdmiChangeUserPasswordController {
    static edit(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return next(api_error_1.ApiError.BadRequest("Validation error", [Object.assign({}, errors)]));
                }
                const { userId, newPassword } = req.body;
                const userData = yield admin_changeUserPassword_service_1.AdminChangePasswordService.edit(userId, newPassword);
                return res.json(userData);
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.AdmiChangeUserPasswordController = AdmiChangeUserPasswordController;
//# sourceMappingURL=admin-changeUserPassword-controller.js.map