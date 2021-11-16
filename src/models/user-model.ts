import { Schema, model } from 'mongoose';

interface User {
  email: string,
  password: string,
  username: string,
  age: number,
  firstName: string,
  lastName: string,
  description: string
}

const schema = new Schema<User>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  age: { type: Number, default: 0},
  firstName: { type: String, default: ''},
  lastName: { type: String, default: ''},
  description: { type: String, default: ''},
})

export const UserModel = model<User>('User', schema);
