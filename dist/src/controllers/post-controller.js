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
exports.PostController = void 0;
const post_service_1 = require("../services/post-service");
const ObjectId = require("mongodb").ObjectId;
class PostController {
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, text, fileName } = req.body;
                const filePath = `http://localhost:3010/${fileName}`;
                const postData = yield post_service_1.PostService.create(userId, text, filePath);
                return res.json(postData);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static edit(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.body;
                const { text } = req.body;
                const postData = yield post_service_1.PostService.edit(id, text);
                return res.json(postData);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static comment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, text, userId } = req.body;
                const postData = yield post_service_1.PostService.comment(id, text, userId);
                return res.json(postData);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.body;
                const postData = yield post_service_1.PostService.delete(id);
                return res.json(postData);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static getAllUserPostsByUserId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = new ObjectId(req.params.userId);
                const userPosts = yield post_service_1.PostService.getAllUserPostsByUserId(userId);
                return res.json(userPosts);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static getAllPosts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const limit = req.query.limit;
                const allPosts = yield post_service_1.PostService.getAllPosts(+limit);
                return res.json(allPosts);
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.PostController = PostController;
//# sourceMappingURL=post-controller.js.map