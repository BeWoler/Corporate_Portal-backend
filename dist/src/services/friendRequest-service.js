"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendRequestService = void 0;
const friends_requests_model_1 = require("../models/friends-requests-model");
const user_model_1 = require("../models/user-model");
const user_dto_1 = require("../dtos/user-dto");
class FriendRequestService {
    static request(receiverId, senderId) {
        return __awaiter(this, void 0, void 0, function* () {
            const candidateFriend = yield friends_requests_model_1.FriendRequestModel.findOne({
                sender: senderId,
                receiver: receiverId,
            });
            if (candidateFriend) {
                return null;
            }
            const request = yield friends_requests_model_1.FriendRequestModel.create({
                sender: senderId,
                receiver: receiverId,
            });
            return request;
        });
    }
    static accept(receiverId, senderId, requestId) {
        return __awaiter(this, void 0, void 0, function* () {
            const receiver = yield user_model_1.UserModel.findOneAndUpdate({ _id: receiverId }, { $addToSet: { friends: senderId } });
            const sender = yield user_model_1.UserModel.findOneAndUpdate({ _id: senderId }, { $addToSet: { friends: receiverId } });
            const request = yield friends_requests_model_1.FriendRequestModel.findOneAndDelete({ requestId });
            const receiverDto = new user_dto_1.UserDto(receiver);
            const senderDto = new user_dto_1.UserDto(sender);
            return { receiver: receiverDto, sender: senderDto, request };
        });
    }
    static decline(requestId) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = yield friends_requests_model_1.FriendRequestModel.findOneAndDelete({
                _id: requestId,
            });
            return request;
        });
    }
    static delete(userId, friendId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.UserModel.findOne({ _id: userId });
            const friend = yield user_model_1.UserModel.findOne({ _id: friendId });
            friend.friends.pull(userId);
            friend.save();
            user.friends.pull(friendId);
            user.save();
            return user;
        });
    }
    static getRequests(receiverId) {
        return __awaiter(this, void 0, void 0, function* () {
            const requests = yield friends_requests_model_1.FriendRequestModel.find({
                receiver: receiverId,
            }).populate("sender");
            return requests;
        });
    }
}
exports.FriendRequestService = FriendRequestService;
//# sourceMappingURL=friendRequest-service.js.map