import mongoose from "mongoose";
import { PostModel } from "../../models/post-model";
import { UserModel } from "../../models/user-model";
import { LikeModel } from "../../models/like-model";
import { CommentModel } from "../../models/comment-model";
import { ConversationModel } from "../../models/conversation-model";

export class AdminDeleteUserService {
  public static async delete(userId: mongoose.ObjectId) {
    const user = await UserModel.deleteOne({ _id: userId });
    const posts = await PostModel.deleteMany({ user: userId });
    const comments = await CommentModel.deleteMany({ user: userId });
    const likes = await LikeModel.deleteMany({ user: userId });
    const conversations = await ConversationModel.deleteMany({
      members: userId,
    });
    return { user, posts, comments, likes, conversations };
  }
}
