import { PostModel } from "../models/post-model";
import { CommentModel } from "../models/comment-model";
import { LikeModel } from "../models/like-model";
import mongoose from "mongoose";

export class PostService {
  public static async create(
    userId: mongoose.ObjectId,
    text: string,
    file: string
  ) {
    const post = await PostModel.create({
      user: userId,
      time: new Date(),
      file: file,
      text,
    });

    return post.populate({ path: "user" });
  }

  public static async edit(id: mongoose.ObjectId, text: string) {
    const post = await PostModel.findOneAndUpdate({ _id: id }, { text: text });

    return {
      post: post,
    };
  }

  public static async comment(
    id: mongoose.ObjectId,
    text: string,
    userId: mongoose.ObjectId
  ) {
    const post = await PostModel.findOne({ _id: id });
    const comment = await CommentModel.create({
      post: id,
      user: userId,
      time: new Date(),
      text: text,
    });

    await post.comments.push(comment._id);
    await post.save();

    return post;
  }

  public static async delete(id: mongoose.ObjectId) {
    const post = await PostModel.findOneAndDelete({ _id: id });
    const comment = await CommentModel.deleteMany({ post: id });
    const like = await LikeModel.deleteMany({ post: id });
    return {
      post: post,
      comment: comment,
      like: like,
    };
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

  public static async getAllPosts(limit?: number) {
    const populateQuery = [
      {
        path: "user",
      },
      {
        path: "comments",
        populate: { path: "user" },
      },
    ];
    const postsLength = await PostModel.find();
    const posts = await PostModel.find().limit(limit).populate(populateQuery);
    return {
      posts: posts,
      length: postsLength.length,
    };
  }
}
