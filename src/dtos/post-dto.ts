import { ObjectId } from "mongoose";

export class PostDto {
  id: ObjectId;
  author: string;
  text: string;
  likes: number;
  comments: object[];

  constructor(model) {
    this.id = model._id;
    this.author = model.author;
    this.text = model.text;
    this.likes = model.likes;
    this.comments = model.comments;
  }
}
