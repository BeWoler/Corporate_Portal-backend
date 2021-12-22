import { Schema, model } from "mongoose";

interface User {
  email: string;
  password: string;
  username: string;
  avatar: string;
  city: string;
  birthday: string;
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

const userSchema = new Schema<User>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  avatar: { type: String },
  city: { type: String, default: "" },
  birthday: { type: String, trim: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  description: { type: String, default: "" },
  stack: { type: String, default: "" },
  position: { type: String, default: "" },
  department: { type: String, default: "" },
  education: { type: String, default: "" },
  skype: { type: String, default: "" },
  phone: { type: Number },
});

export const UserModel = model<User>("User", userSchema);
