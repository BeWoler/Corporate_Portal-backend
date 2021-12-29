import { ObjectId } from "mongoose";

export class PostDto {
  user: ObjectId;
  text: string;
  time: object;
  file: string;
  likes: any;
  comments: object[];

  constructor(model) {
    this.user = model.user;
    this.text = model.text;
    this.time = model.time;
    this.file = model.file;
    this.likes = model.likes;
    this.comments = model.comments;
  }
}
