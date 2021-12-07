import { UserModel } from "../models/user-model";
import { UserDto } from "../dtos/user-dto";

export class AvatarService {
  public static async save(username: string, img: string) {
    const user = await UserModel.findOneAndUpdate(
      { username },
      { avatar: img }
    );

    const userDto = new UserDto(user);
    
    return {
      user: userDto,
    };
  }
}
