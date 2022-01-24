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
exports.ChangeAvatarService = void 0;
const user_model_1 = require("../models/user-model");
const user_dto_1 = require("../dtos/user-dto");
class ChangeAvatarService {
    static changeAvatar(username, img) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.UserModel.findOneAndUpdate({ username }, { avatar: img });
            const userDto = new user_dto_1.UserDto(user);
            return {
                user: userDto,
            };
        });
    }
}
exports.ChangeAvatarService = ChangeAvatarService;
//# sourceMappingURL=changeAvatar-service.js.map