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
exports.AdminRegistrationService = void 0;
const user_model_1 = require("../../models/user-model");
const api_error_1 = require("../../exceptions/api-error");
const user_dto_1 = require("../../dtos/user-dto");
const userpassword_model_1 = require("../../models/userpassword-model");
const bcrypt_1 = __importDefault(require("bcrypt"));
class AdminRegistrationService {
    static registration(email, password, username, firstName, lastName, role) {
        return __awaiter(this, void 0, void 0, function* () {
            const candidateEmail = yield user_model_1.UserModel.findOne({ email });
            const candidateUsername = yield user_model_1.UserModel.findOne({ username });
            if (candidateEmail) {
                throw api_error_1.ApiError.BadRequest("Email already exist", [
                    { message: "Email already exist" },
                ]);
            }
            if (candidateUsername) {
                throw api_error_1.ApiError.BadRequest("Username already exist", [
                    { message: "Username already exist" },
                ]);
            }
            const hashPassword = yield bcrypt_1.default.hash(password, 3);
            const user = yield user_model_1.UserModel.create({
                email,
                username,
                firstName: firstName,
                lastName: lastName,
                role,
            });
            const userPassword = yield userpassword_model_1.UserPasswordModel.create({
                user: user._id,
                password: hashPassword,
            });
            const userDto = new user_dto_1.UserDto(user);
            return {
                user: userDto,
                userPassword,
            };
        });
    }
}
exports.AdminRegistrationService = AdminRegistrationService;
//# sourceMappingURL=admin-registration-service.js.map