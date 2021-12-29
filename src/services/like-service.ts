import { LikeModel } from "../models/like-model";
import { PostModel } from "../models/post-model";
import mongoose from "mongoose";

export class LikeService {
  public static async like(postId: mongoose.ObjectId, user: mongoose.ObjectId) {
    const candidateLike = await LikeModel.findOne({ post: postId, user: user });
    const post = await PostModel.findOne({ _id: postId });
    if (candidateLike) {
      candidateLike.delete();
      post.likes.pull(user);
      post.save();
      return { candidateLike };
    }
    const like = await LikeModel.create({
      user: user,
      post: postId,
    });

    post.likes.push(user);
    post.save();

    return { like };
  }
}
