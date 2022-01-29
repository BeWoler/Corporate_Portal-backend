import { UserModel } from "../models/user-model";
import bcrypt from "bcrypt";
import { ApiError } from "../exceptions/api-error";
import { TokenService } from "../services/token-service";
import { UserDto } from "../dtos/user-dto";
import { UserPasswordModel } from "../models/userpassword-model";

export class RegistrationService {
  public static async registration(
    email: string,
    password: string,
    username: string,
    firstName: string,
    lastName: string
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
    });
    const userPassword = await UserPasswordModel.create({
      user: user._id,
      password: hashPassword,
    });

    const userDto = new UserDto(user);

    const tokens = TokenService.generateTokens({
      _id: user._id,
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
    });
    await TokenService.saveToken(user._id, tokens.refreshToken);

    return {
      user: userDto,
      userPassword,
      ...tokens,
    };
  }
}
