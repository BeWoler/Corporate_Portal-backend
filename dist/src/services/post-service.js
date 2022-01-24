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
exports.PostService = void 0;
const post_model_1 = require("../models/post-model");
const comment_model_1 = require("../models/comment-model");
const like_model_1 = require("../models/like-model");
class PostService {
    static create(userId, text, file) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield post_model_1.PostModel.create({
                user: userId,
                time: new Date(),
                file: file,
                text,
            });
            return post.populate({ path: "user" });
        });
    }
    static edit(id, text) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield post_model_1.PostModel.findOneAndUpdate({ _id: id }, { text: text });
            return {
                post: post,
            };
        });
    }
    static comment(id, text, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield post_model_1.PostModel.findOne({ _id: id });
            const comment = yield comment_model_1.CommentModel.create({
                post: id,
                user: userId,
                time: new Date(),
                text: text,
            });
            yield post.comments.push(comment._id);
            yield post.save();
            return post;
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield post_model_1.PostModel.findOneAndDelete({ _id: id });
            const comment = yield comment_model_1.CommentModel.deleteMany({ post: id });
            const like = yield like_model_1.LikeModel.deleteMany({ post: id });
            return {
                post: post,
                comment: comment,
                like: like,
            };
        });
    }
    static getAllUserPostsByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const populateQuery = [
                {
                    path: "user",
                },
                {
                    path: "comments",
                    populate: { path: "user" },
                },
            ];
            const posts = yield post_model_1.PostModel.find({ user: userId }).populate(populateQuery);
            return posts;
        });
    }
    static getAllPosts(limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const populateQuery = [
                {
                    path: "user",
                },
                {
                    path: "comments",
                    populate: { path: "user" },
                },
            ];
            const postsLength = yield post_model_1.PostModel.find();
            const posts = yield post_model_1.PostModel.find().limit(limit).populate(populateQuery);
            return {
                posts: posts,
                length: postsLength.length,
            };
        });
    }
}
exports.PostService = PostService;
//# sourceMappingURL=post-service.js.map