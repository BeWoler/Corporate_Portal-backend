import { ObjectId } from "mongoose";

export class UserDto {
  email: string;
  username: string;
  id: ObjectId;

  constructor(model) {
    this.email = model.email;
    this.username = model.username;
    this.id = model._id;
  }
}
