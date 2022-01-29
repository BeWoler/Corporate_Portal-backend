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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditUserService = void 0;
const user_model_1 = require("../models/user-model");
const token_service_1 = require("./token-service");
const user_dto_1 = require("../dtos/user-dto");
class EditUserService {
    static editUser(userId, _a) {
        var args = __rest(_a, []);
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.UserModel.findOneAndUpdate({ _id: userId }, Object.assign({}, args));
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
exports.EditUserService = EditUserService;
//# sourceMappingURL=editUser-service.js.map