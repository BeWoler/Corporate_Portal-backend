import { ObjectId } from "mongoose";

export class UserDto {
  email: string;
  username: string;
  avatar: string;
  city: string;
  birthday: Date;
  firstName: string;
  lastName: string;
  stack: string;
  position: string;
  department: string;
  education: string;
  skype: string;
  phone: number;
  friends: any;
  description: string;
  messagesFromFriend: boolean;
  privatePage: boolean;
  id: ObjectId;

  constructor(model) {
    this.email = model.email;
    this.username = model.username;
    this.avatar = model.avatar;
    this.id = model._id;
    this.city = model.city;
    this.birthday = model.birthday;
    this.firstName = model.firstName;
    this.lastName = model.lastName;
    this.stack = model.stack;
    this.position = model.position;
    this.department = model.department;
    this.education = model.education;
    this.skype = model.skype;
    this.phone = model.phone;
    this.friends = model.friends;
    this.messagesFromFriend = model.messagesFromFriend;
    this.privatePage = model.privatePage;
    this.description = model.description;
  }
}
