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
exports.MessageController = void 0;
const message_service_1 = require("../services/message-service");
const ObjectId = require("mongodb").ObjectId;
class MessageController {
    static message(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { conversationId, sender, text } = req.body;
                const message = yield message_service_1.MessageService.message(conversationId, sender, text);
                return res.status(200).json(message);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static getMessages(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const messages = yield message_service_1.MessageService.getMessages(new ObjectId(req.params.conversationId));
                return res.status(200).json(messages);
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.MessageController = MessageController;
//# sourceMappingURL=message-controller.js.map