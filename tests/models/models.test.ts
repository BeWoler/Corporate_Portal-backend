import { UserModel } from "../../src/models/user-model";
import { UserPasswordModel } from "../../src/models/userpassword-model";
import { CommentModel } from "../../src/models/comment-model";
import { ConversationModel } from "../../src/models/conversation-model";
import { FriendRequestModel } from "../../src/models/friends-requests-model";
import { LikeModel } from "../../src/models/like-model";
import { MessageModel } from "../../src/models/message-model";
import { PostModel } from "../../src/models/post-model";
import * as dotenv from "dotenv";
import mongoose from "mongoose";

const ObjectId = require("mongodb").ObjectId;

dotenv.config();

const userId = new ObjectId("61e15956b449213699a20d3a");
const secondUserId = new ObjectId("61e15956b449213699a20d4a");
const postId = new ObjectId("72e15956b449213699a20d3a");
const conversationTestId = new ObjectId("82e15956b449213699a20d3a");

beforeAll((done) => {
  mongoose.connect(process.env.DB_URL);
  done();
});

describe("User model test", () => {
  it("Create user", async () => {
    const user = await UserModel.create({
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
    const secondUser = await UserModel.create({
      _id: secondUserId,
      email: "secondtestmodel@test.com",
      username: "secondtestmodel",
      firstName: "secondtest",
      lastName: "secondtest",
    });
    await UserPasswordModel.create({
      user: secondUser._id,
      password: 1234,
    });
    await UserPasswordModel.create({
      user: user._id,
      password: 1234,
    }).then((res) => {
      expect(res.user).toBe(userId);
      expect(res.password).toBe("1234");
    });
  });

  it("Create user without any fields", async () => {
    await UserModel.create({
      _id: userId,
      firstName: "test",
      lastName: "test",
    }).catch((err) => {
      expect(err);
    });
  });
});

describe("Post, comment & like models test", () => {
  it("Create post", async () => {
    await PostModel.create({
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
  });

  it("Comment post", async () => {
    await CommentModel.create({
      post: postId,
      user: userId,
      text: "test comment",
    }).then((res) => {
      expect(res.post).toBe(postId);
      expect(res.user).toBe(userId);
      expect(res.text).toBe("test comment");
    });
  });

  it("Like post", async () => {
    await LikeModel.create({
      user: userId,
      post: postId,
    }).then((res) => {
      expect(res.user).toBe(userId);
      expect(res.post).toBe(postId);
    });
  });
});

describe("Friends requests, conversation & message models tests", () => {
  it("Create request", async () => {
    await FriendRequestModel.create({
      sender: userId,
      receiver: secondUserId,
    }).then((res) => {
      expect(res.sender).toBe(userId);
      expect(res.receiver).toBe(secondUserId);
    });
  });

  it("Create conversation", async () => {
    await ConversationModel.create({
      _id: conversationTestId,
      members: [userId, secondUserId],
    }).then((res) => {
      expect(res.members[0]).toBe(userId);
      expect(res.members[1]).toBe(secondUserId);
    });
  });

  it("Create message", async () => {
    await MessageModel.create({
      conversationId: conversationTestId,
      sender: userId,
      text: "test hello",
    }).then((res) => {
      expect(res.sender).toBe(userId);
      expect(res.text).toBe("test hello");
      expect(res.conversationId).toBe(conversationTestId);
    });
  });
});

afterAll((done) => {
  mongoose.connection.close();
  done();
});
