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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangePasswordService = void 0;
const user_model_1 = require("../models/user-model");
const token_service_1 = require("../services/token-service");
const user_dto_1 = require("../dtos/user-dto");
const api_error_1 = require("../exceptions/api-error");
const userpassword_model_1 = require("../models/userpassword-model");
const bcrypt_1 = __importDefault(require("bcrypt"));
class ChangePasswordService {
    static edit(userId, newPassword, oldPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const candidateToChange = yield user_model_1.UserModel.findOne({ _id: userId });
            const candidatePassword = yield userpassword_model_1.UserPasswordModel.findOne({
                user: candidateToChange._id,
            });
            const isOldPassEqu = yield bcrypt_1.default.compare(oldPassword, candidatePassword.password);
            if (!isOldPassEqu) {
                throw api_error_1.ApiError.BadRequest("Incorrect old password", [
                    { message: "Incorrect old password" },
                ]);
            }
            const isPassEqu = yield bcrypt_1.default.compare(newPassword, candidatePassword.password);
            if (isPassEqu) {
                throw api_error_1.ApiError.BadRequest("The old password cannot be equal to the new password", [{ message: "The old password cannot be equal to the new password" }]);
            }
            const hashPassword = yield bcrypt_1.default.hash(newPassword, 3);
            yield candidatePassword.update({ password: hashPassword });
            yield candidatePassword.save();
            const userDto = new user_dto_1.UserDto(candidateToChange);
            const tokens = token_service_1.TokenService.generateTokens({
                _id: candidateToChange._id,
                email: candidateToChange.email,
                username: candidateToChange.username,
                firstName: candidateToChange.firstName,
                lastName: candidateToChange.lastName,
            });
            yield token_service_1.TokenService.saveToken(candidateToChange._id, tokens.refreshToken);
            return Object.assign({ user: userDto }, tokens);
        });
    }
}
exports.ChangePasswordService = ChangePasswordService;
//# sourceMappingURL=changePassword-service.js.map