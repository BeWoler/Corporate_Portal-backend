import { UserModel } from "../../models/user-model";
import { UserDto } from "../../dtos/user-dto";
import bcrypt from "bcrypt";
import { UserPasswordModel } from "../../models/userpassword-model";

export class AdminChangePasswordService {
  public static async edit(userId: string, newPassword: string) {
    const candidateToChange = await UserModel.findOne({ _id: userId });
    const candidatePassword = await UserPasswordModel.findOne({
      user: candidateToChange._id,
    });

    const hashPassword = await bcrypt.hash(newPassword, 3);
    await candidatePassword.update({ password: hashPassword });
    await candidatePassword.save();

    const userDto = new UserDto(candidateToChange);

    return {
      user: userDto,
    };
  }
}
