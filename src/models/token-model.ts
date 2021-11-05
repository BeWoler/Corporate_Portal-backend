import { Schema, model } from 'mongoose';
import mongoose from 'mongoose';

interface Token {
  refreshToken: string,
  user: mongoose.ObjectId,
}

const schema = new Schema<Token>({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  refreshToken: { type: String, required: true }
})

export const TokenModel = model<Token>('Token', schema);
