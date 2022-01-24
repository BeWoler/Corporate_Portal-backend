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
exports.UserController = void 0;
const user_service_1 = require("../services/user-service");
const ObjectId = require("mongodb").ObjectId;
class UserController {
    static getUserInfo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_service_1.UserService.getUserInfo(new ObjectId(req.params.userId));
                return res.json(user);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static blockUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.body.userId;
                const blockedUserId = req.body.blockedUserId;
                const blockedUser = yield user_service_1.UserService.blockUser(userId, blockedUserId);
                return res.json(blockedUser);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static unblockUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.body.userId;
                const blockedUserId = req.body.blockedUserId;
                const unblockedUser = yield user_service_1.UserService.unblockUser(userId, blockedUserId);
                return res.json(unblockedUser);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static getUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const args = req.query;
                const limit = req.query.limit;
                const users = yield user_service_1.UserService.getAllUsers(args, +limit);
                return res.json(users);
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user-controller.js.map