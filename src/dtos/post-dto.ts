import { ObjectId } from "mongoose";

export class PostDto {
  id: ObjectId;
  author: string;
  text: string;
  likes: ObjectId[];
  time: object;
  file: string;
  comments: object[];

  constructor(model) {
    this.id = model._id;
    this.author = model.author;
    this.text = model.text;
    this.likes = model.likes;
    this.time = model.time;
    this.file = model.file;
    this.comments = model.comments;
  }
}
