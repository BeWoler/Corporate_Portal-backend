import { LikeModel } from "../models/like-model";
import { PostModel } from "../models/post-model";
import mongoose from "mongoose";

export class LikeService {
  public static async like(post: mongoose.ObjectId, user: mongoose.ObjectId) {
    const candidateLike = await LikeModel.findOne({ post, user });
    const postLike = await PostModel.findOne({ _id: post });
    if (candidateLike) {
      const like = await LikeModel.deleteOne({ post });
      const arrUserIndex = postLike.likes.indexOf(user);
      postLike.likes.splice(arrUserIndex, 1);
      postLike.save();
      return { like, postLike };
    }
    const like = await LikeModel.create({
      user,
      post,
    });

    postLike.likes.push(like.user);
    postLike.save();

    return { like, postLike };
  }
}
