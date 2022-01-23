import { ConversationService } from "../../src/services/conversation-service";
import * as dotenv from "dotenv";
import mongoose from "mongoose";

const ObjectId = require("mongodb").ObjectId;

dotenv.config();

const userId = new ObjectId("61e15956b458913699a20d3a");
const secondUserId = new ObjectId("61e15956b481263699a20d4a");

beforeAll((done) => {
  mongoose.connect(process.env.DB_URL);
  done();
});

describe("Conversation service test", () => {
  it("Create conversation between two users", async () => {
    const res = await ConversationService.conversation(userId, secondUserId);
    expect(res.members[0]).toBe(userId);
    expect(res.members[1]).toBe(secondUserId);
  });

  it("Create existing conversation", async () => {
    await ConversationService.conversation(userId, secondUserId).then((res) => {
      expect(res).toBe(null);
    });
  });

  it("Delete conversation", async () => {
    const conversation = await ConversationService.conversation(
      "61e15956b412613699a20d3a",
      "61e15956b499263699a20d4a"
    );
    await ConversationService.deleteConversation(conversation._id).then(
      (res) => {
        expect(res.members[0]).toBe("61e15956b412613699a20d3a");
        expect(res.members[1]).toBe("61e15956b499263699a20d4a");
      }
    );
  });
});

afterAll((done) => {
  mongoose.connection.close();
  done();
});
