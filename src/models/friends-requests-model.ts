import { Schema, model } from "mongoose";
import mongoose from "mongoose";

interface friendRequest {
  sender: mongoose.ObjectId;
  receiver: mongoose.ObjectId;
}

const friendRequestSchema = new Schema<friendRequest>({
  sender: { type: Schema.Types.ObjectId, ref: "User" },
  receiver: { type: Schema.Types.ObjectId, ref: "User" },
});

export const FriendRequestModel = model<friendRequest>(
  "FriendRequests",
  friendRequestSchema
);
