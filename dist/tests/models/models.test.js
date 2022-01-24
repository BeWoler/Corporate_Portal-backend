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
const user_model_1 = require("../../src/models/user-model");
const userpassword_model_1 = require("../../src/models/userpassword-model");
const comment_model_1 = require("../../src/models/comment-model");
const conversation_model_1 = require("../../src/models/conversation-model");
const friends_requests_model_1 = require("../../src/models/friends-requests-model");
const like_model_1 = require("../../src/models/like-model");
const message_model_1 = require("../../src/models/message-model");
const post_model_1 = require("../../src/models/post-model");
const dotenv = __importStar(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const ObjectId = require("mongodb").ObjectId;
dotenv.config();
const userId = new ObjectId("61e15956b449213699a20d3a");
const secondUserId = new ObjectId("61e15956b449213699a20d4a");
const postId = new ObjectId("72e15956b449213699a20d3a");
const conversationTestId = new ObjectId("82e15956b449213699a20d3a");
beforeAll((done) => {
    mongoose_1.default.connect(process.env.DB_URL);
    done();
});
describe("User model test", () => {
    it("Create user", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield user_model_1.UserModel.create({
            _id: userId,
            email: "testmodel@test.com",
            username: "testmodel",
            firstName: "test",
            lastName: "test",
        });
        expect(user._id).toBe(userId);
        expect(user.email).toBe("testmodel@test.com");
        expect(user.username).toBe("testmodel");
        expect(user.firstName).toBe("test");
        expect(user.lastName).toBe("test");
        const secondUser = yield user_model_1.UserModel.create({
            _id: secondUserId,
            email: "secondtestmodel@test.com",
            username: "secondtestmodel",
            firstName: "secondtest",
            lastName: "secondtest",
        });
        yield userpassword_model_1.UserPasswordModel.create({
            user: secondUser._id,
            password: 1234,
        });
        yield userpassword_model_1.UserPasswordModel.create({
            user: user._id,
            password: 1234,
        }).then((res) => {
            expect(res.user).toBe(userId);
            expect(res.password).toBe("1234");
        });
    }));
    it("Create user without any fields", () => __awaiter(void 0, void 0, void 0, function* () {
        yield user_model_1.UserModel.create({
            _id: userId,
            firstName: "test",
            lastName: "test",
        }).catch((err) => {
            expect(err);
        });
    }));
});
describe("Post, comment & like models test", () => {
    it("Create post", () => __awaiter(void 0, void 0, void 0, function* () {
        yield post_model_1.PostModel.create({
            _id: postId,
            user: userId,
            text: "test text",
            likes: [],
            file: null,
            comments: [],
        }).then((res) => {
            expect(res._id).toBe(postId);
            expect(res.user).toBe(userId);
            expect(res.text).toBe("test text");
        });
    }));
    it("Comment post", () => __awaiter(void 0, void 0, void 0, function* () {
        yield comment_model_1.CommentModel.create({
            post: postId,
            user: userId,
            text: "test comment",
        }).then((res) => {
            expect(res.post).toBe(postId);
            expect(res.user).toBe(userId);
            expect(res.text).toBe("test comment");
        });
    }));
    it("Like post", () => __awaiter(void 0, void 0, void 0, function* () {
        yield like_model_1.LikeModel.create({
            user: userId,
            post: postId,
        }).then((res) => {
            expect(res.user).toBe(userId);
            expect(res.post).toBe(postId);
        });
    }));
});
describe("Friends requests, conversation & message models tests", () => {
    it("Create request", () => __awaiter(void 0, void 0, void 0, function* () {
        yield friends_requests_model_1.FriendRequestModel.create({
            sender: userId,
            receiver: secondUserId,
        }).then((res) => {
            expect(res.sender).toBe(userId);
            expect(res.receiver).toBe(secondUserId);
        });
    }));
    it("Create conversation", () => __awaiter(void 0, void 0, void 0, function* () {
        yield conversation_model_1.ConversationModel.create({
            _id: conversationTestId,
            members: [userId, secondUserId],
        }).then((res) => {
            expect(res.members[0]).toBe(userId);
            expect(res.members[1]).toBe(secondUserId);
        });
    }));
    it("Create message", () => __awaiter(void 0, void 0, void 0, function* () {
        yield message_model_1.MessageModel.create({
            conversationId: conversationTestId,
            sender: userId,
            text: "test hello",
        }).then((res) => {
            expect(res.sender).toBe(userId);
            expect(res.text).toBe("test hello");
            expect(res.conversationId).toBe(conversationTestId);
        });
    }));
});
afterAll((done) => {
    mongoose_1.default.connection.close();
    done();
});
//# sourceMappingURL=models.test.js.map