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
exports.ConversetionController = void 0;
const conversation_service_1 = require("../services/conversation-service");
class ConversetionController {
    static conversation(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conversation = yield conversation_service_1.ConversationService.conversation(req.body.senderId, req.body.receiverId);
                return res.json(conversation);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static deleteConversation(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { conversationId } = req.body;
                const conversation = yield conversation_service_1.ConversationService.deleteConversation(conversationId);
                return res.json(conversation);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static getConversations(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conversations = yield conversation_service_1.ConversationService.getConversations(req.params.userId);
                return res.json(conversations);
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.ConversetionController = ConversetionController;
//# sourceMappingURL=conversation-controller.js.map