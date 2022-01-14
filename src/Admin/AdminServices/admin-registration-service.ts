import { UserModel } from "../../models/user-model";
import { ApiError } from "../../exceptions/api-error";
import { UserDto } from "../../dtos/user-dto";
import { UserPasswordModel } from "../../models/userpassword-model";
import bcrypt from "bcrypt";

export class AdminRegistrationService {
  public static async registration(
    email: string,
    password: string,
    username: string,
    firstName: string,
    lastName: string,
    role?: string
  ) {
    const candidateEmail = await UserModel.findOne({ email });
    const candidateUsername = await UserModel.findOne({ username });
    if (candidateEmail) {
      throw ApiError.BadRequest("Email already exist", [
        { message: "Email already exist" },
      ]);
    }
    if (candidateUsername) {
      throw ApiError.BadRequest("Username already exist", [
        { message: "Username already exist" },
      ]);
    }
    const hashPassword = await bcrypt.hash(password, 3);

    const user = await UserModel.create({
      email,
      username,
      firstName: firstName,
      lastName: lastName,
      role,
    });
    const userPassword = await UserPasswordModel.create({
      user: user._id,
      password: hashPassword,
    });

    const userDto = new UserDto(user);

    return {
      user: userDto,
      userPassword,
    };
  }
}
