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
exports.RegistrationController = void 0;
const registration_service_1 = require("../services/registration-service");
const express_validator_1 = require("express-validator");
const api_error_1 = require("../exceptions/api-error");
class RegistrationController {
    static registration(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return next(api_error_1.ApiError.BadRequest("Validation error", [Object.assign({}, errors)]));
                }
                const { email, password, username, firstName, lastName } = req.body;
                const userData = yield registration_service_1.RegistrationService.registration(email, password, username, firstName, lastName);
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
exports.RegistrationController = RegistrationController;
//# sourceMappingURL=registration-controller.js.map