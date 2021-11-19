import { Schema, model } from "mongoose";

interface User {
  email: string;
  password: string;
  username: string;
  userInfo: object;
  birthday: number;
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
  userInfo: {
    type: Object,
    default: {
      birthday: { type: Date, trim: true, default: 0 },
      firstName: { type: String, default: "" },
      lastName: { type: String, default: "" },
      description: { type: String, default: "" },
      stack: { type: String, default: "" },
      position: { type: String, default: "" },
      department: { type: String, default: "" },
      education: { type: String, default: "" },
      skype: { type: String, default: "" },
      phone: { type: Number, default: 0 },
    },
  },
});

export const UserModel = model<User>("User", schema);
