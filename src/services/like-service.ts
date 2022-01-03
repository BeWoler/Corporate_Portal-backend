import { LikeModel } from "../models/like-model";
import { PostModel } from "../models/post-model";
import mongoose from "mongoose";

export class LikeService {
  public static async like(postId: mongoose.ObjectId, user: mongoose.ObjectId) {
    const candidateLike = await LikeModel.findOne({ post: postId, user: user });
    const post = await PostModel.findOne({ _id: postId });
    if (candidateLike) {
      await candidateLike.delete();
      await post.likes.pull(user);
      await post.save();
      return { candidateLike };
    }
    const like = await LikeModel.create({
      user: user,
      post: postId,
    });

    await post.likes.push(user);
    await post.save();

    return { like };
  }
}
