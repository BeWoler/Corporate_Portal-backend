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
exports.MessageService = void 0;
const message_model_1 = require("../models/message-model");
class MessageService {
    static message(conversationId, sender, text) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = yield message_model_1.MessageModel.create({
                conversationId,
                sender,
                text,
                date: new Date(),
            });
            return message.populate("sender");
        });
    }
    static getMessages(conversationId) {
        return __awaiter(this, void 0, void 0, function* () {
            const messages = yield message_model_1.MessageModel.find({ conversationId }).populate("sender");
            return messages;
        });
    }
}
exports.MessageService = MessageService;
//# sourceMappingURL=message-service.js.map