import * as dotenv from "dotenv";
import mongoose from "mongoose";
import { PostModel } from "../models/post-model";
import { UserModel } from "../models/user-model";

dotenv.config();

const db = process.env.DB_URL;

const seeder = async () => {
  await mongoose.connect(db);
  console.log("Connected");
  try {
    const user = await UserModel.create({
      email: "test@test.com",
      username: "test",
      firstName: "Test",
      lastName: "Test",
      role: "member",
    });
    const post = await PostModel.create({
      user: user._id,
      text: "Test post",
      time: new Date(),
      file: "http://localhost:3010/null",
      likes: [],
      comments: [],
    });
    console.log("seed done", user, post);
    await mongoose.disconnect();
  } catch (e) {
    console.log("seed err", e);
  }
};

seeder();
