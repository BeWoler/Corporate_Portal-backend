import * as dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { PostModel } from "../models/post-model";
import { UserModel } from "../models/user-model";
import { CommentModel } from "../models/comment-model";
import { LikeModel } from "../models/like-model";
import { UserPasswordModel } from "../models/userpassword-model";

dotenv.config();

const db = process.env.DB_URL;

const seeder = async () => {
  await mongoose.connect(db);
  console.log("Connected");
  const hashPassword = await bcrypt.hash("1234", 3);
  try {
    const user = await UserModel.create({
      email: "test@test.com",
      username: "test",
      firstName: "Test",
      lastName: "Test",
      role: "member",
    });

    const userPassword = await UserPasswordModel.create({
      user: user._id,
      password: hashPassword,
    });

    const post = await PostModel.create({
      user: user._id,
      text: "Test post",
      time: new Date(),
      file: "http://localhost:3010/null",
      likes: [],
      comments: [],
    });

    const comment = await CommentModel.create({
      post: post._id,
      user: user._id,
      time: new Date(),
      text: "Test comment",
    });
    await post.comments.push(comment._id);
    await post.save();

    const like = await LikeModel.create({
      user: user._id,
      post: post._id,
    });
    await post.likes.push(user._id);
    await post.save();

    console.log("seed done", user, userPassword, post, comment, like);
    await mongoose.disconnect();
  } catch (e) {
    console.log("seed err", e);
  }
};

seeder();
