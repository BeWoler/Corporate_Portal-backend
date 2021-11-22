import { PostModel } from "../models/post-model";
import { UserModel } from "../models/user-model";
import { PostDto } from "../dtos/post-dto";

export class PostService {
  public static async create(username: string, text: string) {
    const user = await UserModel.findOne({ username });
    const post = await PostModel.create({
      user: user._id,
      author: user.username,
      text,
    });

    const postDto = new PostDto(post);

    return {
      post: postDto,
    };
  }

  public static async edit(id: string, text: string) {
    const post = await PostModel.findOneAndUpdate({ _id: id}, {text: text})

    const postDto = new PostDto(post);

    return {
      post: postDto,
    };
  }

  public static async delete(id: string) {
    const post = await PostModel.findOneAndDelete({ _id: id});
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
