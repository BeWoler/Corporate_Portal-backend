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
exports.UserService = void 0;
const user_model_1 = require("../models/user-model");
const user_dto_1 = require("../dtos/user-dto");
class UserService {
    static getUserInfo(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.UserModel.findOne({ _id: userId }).populate("friends");
            const userDto = new user_dto_1.UserDto(user);
            return {
                user: userDto,
            };
        });
    }
    static blockUser(userId, blockedUserId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield user_model_1.UserModel.findOneAndUpdate({ _id: userId }, { $addToSet: { blockedUser: blockedUserId } });
            return blockedUserId;
        });
    }
    static unblockUser(userId, blockedUserId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.UserModel.findOne({ _id: userId });
            yield user.blockedUser.pull(blockedUserId);
            yield user.save();
            return blockedUserId;
        });
    }
    static getAllUsers(args, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const allUsers = yield user_model_1.UserModel.find();
            const users = yield user_model_1.UserModel.find(args).limit(limit);
            return {
                users,
                length: allUsers.length,
            };
        });
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user-service.js.map