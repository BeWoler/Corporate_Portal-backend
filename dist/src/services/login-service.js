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
exports.LoginService = void 0;
const user_model_1 = require("../models/user-model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const api_error_1 = require("../exceptions/api-error");
const token_service_1 = require("../services/token-service");
const user_dto_1 = require("../dtos/user-dto");
const userpassword_model_1 = require("../models/userpassword-model");
class LoginService {
    static login(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.UserModel.findOne({ username: username });
            if (!user) {
                throw api_error_1.ApiError.BadRequest("User does not exist", [
                    { message: "User does not exist" },
                ]);
            }
            const userPassword = yield userpassword_model_1.UserPasswordModel.findOne({ user: user._id });
            const isPassEqu = yield bcrypt_1.default.compare(password, userPassword.password);
            if (!isPassEqu) {
                throw api_error_1.ApiError.BadRequest("Incorrect password", [
                    { message: "Incorrect password" },
                ]);
            }
            const userDto = new user_dto_1.UserDto(user);
            const tokens = token_service_1.TokenService.generateTokens({
                _id: user._id,
                email: user.email,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
            });
            yield token_service_1.TokenService.saveToken(user._id, tokens.refreshToken);
            return Object.assign({ user: user, userPassword }, tokens);
        });
    }
    static refresh(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!refreshToken) {
                throw api_error_1.ApiError.UnauthorizedError();
            }
            const userData = token_service_1.TokenService.validateRefreshToken(refreshToken);
            const tokenFromDb = yield token_service_1.TokenService.findToken(refreshToken);
            if (!userData || !tokenFromDb) {
                throw api_error_1.ApiError.UnauthorizedError();
            }
            const user = yield user_model_1.UserModel.findById(userData._id).populate("friends");
            const userDto = new user_dto_1.UserDto(user);
            const tokens = token_service_1.TokenService.generateTokens({
                _id: user._id,
                email: user.email,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
            });
            yield token_service_1.TokenService.saveToken(user._id, tokens.refreshToken);
            return Object.assign({ user: userDto }, tokens);
        });
    }
}
exports.LoginService = LoginService;
//# sourceMappingURL=login-service.js.map