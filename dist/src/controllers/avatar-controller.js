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
exports.AvatarController = void 0;
const avatar_service_1 = require("../services/avatar-service");
class AvatarController {
    static save(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.file) {
                    const { username } = req.cookies;
                    const imgPath = yield avatar_service_1.AvatarService.save(username, "http://localhost:3010/" + req.file.path);
                    return res.json(imgPath);
                }
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.AvatarController = AvatarController;
//# sourceMappingURL=avatar-controller.js.map