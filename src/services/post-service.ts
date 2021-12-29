import { PostModel } from "../models/post-model";
import { CommentModel } from "../models/comment-model";
import { PostDto } from "../dtos/post-dto";
import mongoose from "mongoose";

export class PostService {
  public static async create(
    userId: mongoose.ObjectId,
    text: string,
    file: string
  ) {
    const data = new Date();

    const objDate = {
      year: data.getFullYear(),
      month: data.getMonth() + 1,
      day: data.getDate(),
      hours: data.getHours(),
      minutes: data.getMinutes(),
    };

    const post = await PostModel.create({
      user: userId,
      time: objDate,
      file: file,
      text,
    });

    const postDto = new PostDto(post);

    return {
      post: postDto,
    };
  }

  public static async edit(id: string, text: string) {
    const post = await PostModel.findOneAndUpdate({ _id: id }, { text: text });

    const postDto = new PostDto(post);

    return {
      post: postDto,
    };
  }

  public static async comment(
    id: string,
    text: string,
    userId: mongoose.ObjectId
  ) {
    const data = new Date();

    const objDate = {
      year: data.getFullYear(),
      month: data.getMonth() + 1,
      day: data.getDate(),
      hours: data.getHours(),
      minutes: data.getMinutes(),
    };

    const post = await PostModel.findOne({ _id: id });
    const comment = await CommentModel.create({
      post: id,
      user: userId,
      time: objDate,
      text: text,
    });

    post.comments.push(comment._id);
    post.save();

    return post;
  }

  public static async delete(id: string) {
    const post = await PostModel.findOneAndDelete({ _id: id });
    return post;
  }

  public static async getAllUserPostsByUserId(userId: mongoose.ObjectId) {
    const populateQuery = [
      {
        path: "user",
      },
      {
        path: "comments",
        populate: { path: "user" },
      },
    ];
    const posts = await PostModel.find({ user: userId }).populate(
      populateQuery
    );
    return posts;
  }

  public static async getAllPosts() {
    const posts = await PostModel.find().populate("user");
    return posts;
  }
}
