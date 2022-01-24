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
exports.AdminDeleteUserService = void 0;
const post_model_1 = require("../../models/post-model");
const user_model_1 = require("../../models/user-model");
const like_model_1 = require("../../models/like-model");
const comment_model_1 = require("../../models/comment-model");
const conversation_model_1 = require("../../models/conversation-model");
const userpassword_model_1 = require("../../models/userpassword-model");
class AdminDeleteUserService {
    static delete(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.UserModel.deleteOne({ _id: userId });
            const posts = yield post_model_1.PostModel.deleteMany({ user: userId });
            const userPassword = yield userpassword_model_1.UserPasswordModel.deleteOne({ user: userId });
            const comments = yield comment_model_1.CommentModel.deleteMany({ user: userId });
            const likes = yield like_model_1.LikeModel.deleteMany({ user: userId });
            const conversations = yield conversation_model_1.ConversationModel.deleteMany({
                members: userId,
            });
            return { user, posts, userPassword, comments, likes, conversations };
        });
    }
}
exports.AdminDeleteUserService = AdminDeleteUserService;
//# sourceMappingURL=admin-deleteUser-service.js.map