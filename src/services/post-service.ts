import { PostModel } from "../models/post-model";
import { CommentModel } from "../models/comment-model";
import { UserModel } from "../models/user-model";
import { PostDto } from "../dtos/post-dto";

export class PostService {
  public static async create(username: string, text: string, file: string) {
    const data = new Date();
    const objDate = {
      year: data.getFullYear(),
      month: data.getMonth() + 1,
      day: data.getDate(),
      hours: data.getHours(),
      minutes: data.getMinutes(),
    };
    const user = await UserModel.findOne({ username });
    const post = await PostModel.create({
      user: user._id,
      author: user.username,
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

  public static async comment(id: string, username: string, text: string) {
    const data = new Date();
    const objDate = {
      year: data.getFullYear(),
      month: data.getMonth() + 1,
      day: data.getDate(),
      hours: data.getHours(),
      minutes: data.getMinutes(),
    };
    const user = await UserModel.findOne({ username });
    const post = await PostModel.findOne({ _id: id });
    const comment = await CommentModel.create({
      post: id,
      user: user.id,
      author: username,
      avatar: user.avatar,
      time: objDate,
      text: text,
    });

    post.comments.push(comment);
    post.save();

    const postDto = new PostDto(post);

    return {
      post: postDto,
    };
  }

  public static async delete(id: string) {
    const post = await PostModel.findOneAndDelete({ _id: id });
    return post;
  }

  public static async getAllUserPostsByUsername(username: string) {
    const posts = await PostModel.find({ author: username });
    return posts;
  }

  public static async getAllUserPostsByUserId(userId: string) {
    const posts = await PostModel.find({ user: userId });
    return posts;
  }

  public static async getAllPosts() {
    const posts = await PostModel.find();
    return posts;
  }
}
