import { Schema, model } from "mongoose";
import mongoose from "mongoose"

const friendRequestSchema = new Schema({
  sender: { type: Schema.Types.ObjectId, ref: "User" },
  receiver: { type: Schema.Types.ObjectId, ref: "User" }
});

export const FriendRequestModel = model("FriendRequests", friendRequestSchema);
