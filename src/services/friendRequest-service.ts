import { FriendRequestModel } from "../models/friends-requests-model";
import { UserModel } from "../models/user-model";
import { UserDto } from "../dtos/user-dto";
import mongoose from "mongoose";

export class FriendRequestService {
  public static async request(
    receiverId: mongoose.ObjectId,
    senderId: mongoose.ObjectId
  ) {
    const candidateFriend = await FriendRequestModel.findOne({
      sender: senderId,
      receiver: receiverId,
    });
    if (candidateFriend) {
      return null;
    }
    const request = await FriendRequestModel.create({
      sender: senderId,
      receiver: receiverId,
    });
    return request;
  }

  public static async accept(
    receiverId: mongoose.ObjectId,
    senderId: mongoose.ObjectId,
    requestId: mongoose.ObjectId
  ) {
    const receiver = await UserModel.findOneAndUpdate(
      { _id: receiverId },
      { $addToSet: { friends: senderId } }
    );
    const sender = await UserModel.findOneAndUpdate(
      { _id: senderId },
      { $addToSet: { friends: receiverId } }
    );
    const request = await FriendRequestModel.findOneAndDelete({ requestId });

    const receiverDto = new UserDto(receiver);
    const senderDto = new UserDto(sender);
    return { receiver: receiverDto, sender: senderDto, request };
  }

  public static async decline(requestId: mongoose.ObjectId) {
    const request = await FriendRequestModel.findOneAndDelete({
      _id: requestId,
    });
    return request;
  }

  public static async delete(
    userId: mongoose.ObjectId,
    friendId: mongoose.ObjectId
  ) {
    const user = await UserModel.findOne({ _id: userId });
    const friend = await UserModel.findOne({ _id: friendId });

    friend.friends.pull(userId);
    friend.save();

    user.friends.pull(friendId);
    user.save();

    return user;
  }

  public static async getRequests(receiverId: mongoose.ObjectId) {
    const requests = await FriendRequestModel.find({
      receiver: receiverId,
    }).populate("sender");
    return requests;
  }
}
