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
exports.userServices = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prismaDB_1 = __importDefault(require("../../utils/prismaDB"));
const secret = process.env.JWT_SECRET;
const createSingleUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
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
        id: isExist.id,
        email: isExist.email,
        role: isExist.role,
        address: isExist.address,
    };
    const token = jsonwebtoken_1.default.sign(jwt_payload, secret, { expiresIn: "365d" });
    return token;
});
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaDB_1.default.user.findMany({});
    return result;
});
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaDB_1.default.user.findUnique({
        where: {
            id,
        },
    });
    return result;
});
const updateSingleUser = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prismaDB_1.default.user.findFirst({
        where: {
            id,
        },
    });
    if (!isExist) {
        throw new Error("Resource Not Found ! 🦀");
    }
    const result = yield prismaDB_1.default.user.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
const deleteSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prismaDB_1.default.user.findFirst({
        where: {
            id,
        },
    });
    if (!isExist) {
        throw new Error("Resource Not Found ! 🦀");
    }
    const result = yield prismaDB_1.default.user.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.userServices = {
    createSingleUser,
    loginUser,
    getAllUsers,
    getSingleUser,
    updateSingleUser,
    deleteSingleUser,
};
