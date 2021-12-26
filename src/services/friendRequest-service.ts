import { FriendRequestModel } from "../models/friends-requests-model";
import { UserModel } from "../models/user-model";
import { UserDto } from "../dtos/user-dto";

export class FriendRequestService {
  public static async request(receiverId: string, senderId: string) {
    const candidateFriend = await FriendRequestModel.findOne({
      sender: senderId,
      receiver: receiverId,
    });
    if (candidateFriend) {
      return;
    }
    const request = await FriendRequestModel.create({
      sender: senderId,
      receiver: receiverId,
    });
    return request;
  }

  public static async accept(
    receiverId: string,
    senderId: string,
    requestId: string
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

  public static async decline(requestId: string) {
    const request = await FriendRequestModel.findOneAndDelete({
      _id: requestId,
    });
    return request;
  }
}
