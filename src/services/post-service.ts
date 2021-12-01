import { PostModel } from "../models/post-model";
import { CommentModel } from "../models/comment-model";
import { UserModel } from "../models/user-model";
import { PostDto } from "../dtos/post-dto";

export class PostService {
  public static async create(username: string, text: string) {
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
    const post = await PostModel.findOne({ _id: id });
    const comment = await CommentModel.create({
      post: id,
      author: username,
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

  public static async getPost(username: string) {
    const user = await UserModel.findOne({ username });
    const posts = await PostModel.find({ user: user._id });
    return posts;
  }

  public static async getAllPosts() {
    const posts = await PostModel.find();
    return posts;
  }
}
