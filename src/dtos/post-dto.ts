import { ObjectId } from "mongoose";

export class PostDto {
  id: ObjectId;
  author: string;
  text: string;

  constructor(model) {
    this.id = model._id;
    this.author = model.author;
    this.text = model.text;
  }
}
