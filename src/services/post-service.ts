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

  public static async edit() {}

  public static async delete() {}
}
