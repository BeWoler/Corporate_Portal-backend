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
exports.AdminChangePasswordService = void 0;
const user_model_1 = require("../../models/user-model");
const user_dto_1 = require("../../dtos/user-dto");
const userpassword_model_1 = require("../../models/userpassword-model");
const bcrypt_1 = __importDefault(require("bcrypt"));
class AdminChangePasswordService {
    static edit(userId, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const candidateToChange = yield user_model_1.UserModel.findOne({ _id: userId });
            const candidatePassword = yield userpassword_model_1.UserPasswordModel.findOne({
                user: candidateToChange._id,
            });
            const hashPassword = yield bcrypt_1.default.hash(newPassword, 3);
            yield candidatePassword.update({ password: hashPassword });
            yield candidatePassword.save();
            const userDto = new user_dto_1.UserDto(candidateToChange);
            return {
                user: userDto,
            };
        });
    }
}
exports.AdminChangePasswordService = AdminChangePasswordService;
//# sourceMappingURL=admin-changeUserPassword-service.js.map