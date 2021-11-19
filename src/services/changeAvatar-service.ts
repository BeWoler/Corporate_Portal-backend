import { UserModel } from "../models/user-model";
import { UserDto } from "../dtos/user-dto";

export class ChangeAvatarService {
  public static async changeAvatar(username: string, avatar: string) {
    const user = await UserModel.findOneAndUpdate({ username }, { avatar });

    const userDto = new UserDto(user);

    return {
      user: userDto,
    };
  }
}
