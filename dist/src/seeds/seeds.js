"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const dotenv = __importStar(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const post_model_1 = require("../models/post-model");
const user_model_1 = require("../models/user-model");
const comment_model_1 = require("../models/comment-model");
const like_model_1 = require("../models/like-model");
const userpassword_model_1 = require("../models/userpassword-model");
dotenv.config();
const db = process.env.DB_URL;
const seeder = () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connect(db);
    console.log("Connected");
    const hashPassword = yield bcrypt_1.default.hash("1234", 3);
    try {
        const user = yield user_model_1.UserModel.create({
            email: "test@test.com",
            username: "test",
            firstName: "Test",
            lastName: "Test",
            role: "member",
        });
        const userPassword = yield userpassword_model_1.UserPasswordModel.create({
            user: user._id,
            password: hashPassword,
        });
        const post = yield post_model_1.PostModel.create({
            user: user._id,
            text: "Test post",
            time: new Date(),
            file: "http://localhost:3010/null",
            likes: [],
            comments: [],
        });
        const comment = yield comment_model_1.CommentModel.create({
            post: post._id,
            user: user._id,
            time: new Date(),
            text: "Test comment",
        });
        yield post.comments.push(comment._id);
        yield post.save();
        const like = yield like_model_1.LikeModel.create({
            user: user._id,
            post: post._id,
        });
        yield post.likes.push(user._id.toString());
        yield post.save();
        console.log("seed done", user, userPassword, post, comment, like);
        yield mongoose_1.default.disconnect();
    }
    catch (e) {
        console.log("seed err", e);
    }
});
seeder();
//# sourceMappingURL=seeds.js.map