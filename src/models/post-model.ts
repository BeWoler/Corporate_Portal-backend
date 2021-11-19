import { Schema, model } from 'mongoose';
import mongoose from 'mongoose';

interface Post {
  user: mongoose.ObjectId;
  post: object;
}

const schema = new Schema<Post> ({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  post: { type: Object }
})

export const PostModel = model<Post>("Post", schema);
