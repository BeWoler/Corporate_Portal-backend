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
exports.FriendRequestController = void 0;
const friendRequest_service_1 = require("../services/friendRequest-service");
const ObjectId = require("mongodb").ObjectId;
class FriendRequestController {
    static request(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { receiverId, senderId } = req.body;
                const request = yield friendRequest_service_1.FriendRequestService.request(receiverId, senderId);
                return res.json(request);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static accept(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { receiverId, senderId, requestId } = req.body;
                const accept = yield friendRequest_service_1.FriendRequestService.accept(receiverId, senderId, requestId);
                return res.json(accept);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static decline(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { requestId } = req.body;
                const decline = yield friendRequest_service_1.FriendRequestService.decline(requestId);
                return res.json(decline);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, friendId } = req.body;
                const deleteFriend = yield friendRequest_service_1.FriendRequestService.delete(userId, friendId);
                return res.json(deleteFriend);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static getRequests(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const requests = yield friendRequest_service_1.FriendRequestService.getRequests(new ObjectId(req.params.receiverId));
                return res.json(requests);
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.FriendRequestController = FriendRequestController;
//# sourceMappingURL=friendRequest-controller.js.map