import { Schema, model } from "mongoose";

const friendRequestSchema = new Schema({
  sender: { type: String },
  receiver: { type: String }
});

export const FriendRequestModel = model("FriendRequests", friendRequestSchema);
