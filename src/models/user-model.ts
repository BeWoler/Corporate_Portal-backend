import { Schema, model } from 'mongoose';

interface User {
  email: string,
  password: string,
  username: string
}

const schema = new Schema<User>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true, unique: true }
})

export const UserModel = model<User>('User', schema);
