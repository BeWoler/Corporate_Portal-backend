import { Schema, model } from "mongoose";
import mongoose from "mongoose";

interface UserPassword {
  user: mongoose.ObjectId;
  password: string;
}

const userPasswordSchema = new Schema<UserPassword>({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  password: { type: String, required: true },
});

export const UserPasswordModel = model<UserPassword>(
  "UserPassword",
  userPasswordSchema
);
