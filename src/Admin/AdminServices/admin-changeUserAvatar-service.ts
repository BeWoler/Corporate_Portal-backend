import { UserModel } from "../../models/user-model";
import { UserDto } from "../../dtos/user-dto";

export class AdminChangeUserAvatarService {
  public static async save(userId: string, img: string) {
    const user = await UserModel.findOneAndUpdate(
      { _id: userId },
      { avatar: img }
    );

    const userDto = new UserDto(user);

    return {
      user: userDto,
    };
  }
}
