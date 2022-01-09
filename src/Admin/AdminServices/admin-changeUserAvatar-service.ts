import { UserModel } from "../../models/user-model";
import { UserDto } from "../../dtos/user-dto";

export class AdminChangeUserAvatarService {
  public static async save(userId: string, avatarUrl: string) {
    const user = await UserModel.findOneAndUpdate(
      { _id: userId },
      { avatar: avatarUrl }
    );

    const userDto = new UserDto(user);

    return {
      user: userDto,
    };
  }
}
