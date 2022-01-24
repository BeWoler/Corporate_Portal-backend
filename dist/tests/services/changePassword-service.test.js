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
const changePassword_service_1 = require("../../src/services/changePassword-service");
const dotenv = __importStar(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const ObjectId = require("mongodb").ObjectId;
dotenv.config();
const userId = new ObjectId("61e15956b449213699a20d3a");
beforeAll((done) => {
    mongoose_1.default.connect(process.env.DB_URL);
    done();
});
describe("ChangePassword service", () => {
    it("Change pass with wrong old password", () => __awaiter(void 0, void 0, void 0, function* () {
        yield changePassword_service_1.ChangePasswordService.edit(userId, "12345", "12412412412412").catch((err) => {
            expect(err.status).toBe(400);
            expect(err.message).toBe("Incorrect old password");
        });
    }));
    it("Change pass with equal passwords", () => __awaiter(void 0, void 0, void 0, function* () {
        yield changePassword_service_1.ChangePasswordService.edit(userId, "1234", "1234").catch((err) => {
            expect(err.status).toBe(400);
            expect(err.message).toBe("The old password cannot be equal to the new password");
        });
    }));
    it("Change pass with the right passwords", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield changePassword_service_1.ChangePasswordService.edit(userId, "12345", "1234");
        expect(res.user);
        expect(res.refreshToken);
        expect(res.accessToken);
        yield changePassword_service_1.ChangePasswordService.edit(userId, "1234", "12345");
        expect(res.user);
        expect(res.refreshToken);
        expect(res.accessToken);
    }));
});
afterAll((done) => {
    mongoose_1.default.connection.close();
    done();
});
//# sourceMappingURL=changePassword-service.test.js.map