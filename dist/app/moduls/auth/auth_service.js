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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authServices = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const apiError_1 = __importDefault(require("../../errors/apiError"));
const prismaDB_1 = __importDefault(require("../../utils/prismaDB"));
const secret = process.env.JWT_SECRET;
const createSingleUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield prismaDB_1.default.user.findFirst({
        where: {
            email: data.email,
        },
    });
    if (isUserExist) {
        throw new apiError_1.default(409, "Email already exists");
    }
    const result = yield prismaDB_1.default.user.create({
        data,
    });
    return result;
});
const loginUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const email = data.email;
    const isExist = yield prismaDB_1.default.user.findFirst({
        where: {
            email,
        },
    });
    if (!isExist) {
        throw new Error("Not Authenticated");
    }
    const jwt_payload = {
        role: isExist.role,
        userId: isExist.id,
    };
    const token = jsonwebtoken_1.default.sign(jwt_payload, secret, { expiresIn: "365d" });
    return token;
});
exports.authServices = {
    createSingleUser,
    loginUser,
};
