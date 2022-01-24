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
exports.ConversationService = void 0;
const conversation_model_1 = require("../models/conversation-model");
class ConversationService {
    static conversation(senderId, receiverId) {
        return __awaiter(this, void 0, void 0, function* () {
            const candidateSender = yield conversation_model_1.ConversationModel.findOne({
                members: [senderId, receiverId],
            });
            const candidateReceiver = yield conversation_model_1.ConversationModel.findOne({
                members: [receiverId, senderId],
            });
            const found = candidateReceiver || candidateSender;
            if (found) {
                return null;
            }
            const newConversation = yield conversation_model_1.ConversationModel.create({
                members: [senderId, receiverId],
            });
            return newConversation;
        });
    }
    static deleteConversation(conversationId) {
        return __awaiter(this, void 0, void 0, function* () {
            const conversation = yield conversation_model_1.ConversationModel.findOneAndDelete({
                _id: conversationId,
            });
            return conversation;
        });
    }
    static getConversations(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const conversation = yield conversation_model_1.ConversationModel.find({
                members: { $in: [userId] },
            }).populate("members");
            return conversation;
        });
    }
}
exports.ConversationService = ConversationService;
//# sourceMappingURL=conversation-service.js.map