import { ObjectId } from "mongoose";

export class PostDto {
  id: ObjectId;
  text: string;

  constructor(model) {
    this.id = model._id;
    this.text = model.text;
  }
}
