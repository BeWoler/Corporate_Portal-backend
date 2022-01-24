"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const conversation_service_1 = require("../../src/services/conversation-service");
const dotenv = __importStar(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const ObjectId = require("mongodb").ObjectId;
dotenv.config();
const userId = new ObjectId("61e15956b458913699a20d3a");
const secondUserId = new ObjectId("61e15956b481263699a20d4a");
beforeAll((done) => {
    mongoose_1.default.connect(process.env.DB_URL);
    done();
});
describe("Conversation service test", () => {
    it("Create conversation between two users", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield conversation_service_1.ConversationService.conversation(userId, secondUserId);
        expect(res.members[0]).toBe(userId);
        expect(res.members[1]).toBe(secondUserId);
    }));
    it("Create existing conversation", () => __awaiter(void 0, void 0, void 0, function* () {
        yield conversation_service_1.ConversationService.conversation(userId, secondUserId).then((res) => {
            expect(res).toBe(null);
        });
    }));
    it("Delete conversation", () => __awaiter(void 0, void 0, void 0, function* () {
        const conversation = yield conversation_service_1.ConversationService.conversation("61e15956b412613699a20d3a", "61e15956b499263699a20d4a");
        yield conversation_service_1.ConversationService.deleteConversation(conversation._id).then((res) => {
            expect(res.members[0]).toBe("61e15956b412613699a20d3a");
            expect(res.members[1]).toBe("61e15956b499263699a20d4a");
        });
    }));
});
afterAll((done) => {
    mongoose_1.default.connection.close();
    done();
});
//# sourceMappingURL=conversation-service.test.js.map