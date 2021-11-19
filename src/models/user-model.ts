import { Schema, model } from "mongoose";

interface User {
  email: string;
  password: string;
  username: string;
  userInfo: object;
  birthday: Date;
  firstName: string;
  lastName: string;
  stack: string;
  position: string;
  department: string;
  education: string;
  skype: string;
  phone: number;
  description: string;
}

const schema = new Schema<User>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  birthday: { type: Date, trim: true },
  firstName: { type: String },
  lastName: { type: String },
  description: { type: String },
  stack: { type: String },
  position: { type: String },
  department: { type: String },
  education: { type: String },
  skype: { type: String },
  phone: { type: Number },
});

export const UserModel = model<User>("User", schema);
