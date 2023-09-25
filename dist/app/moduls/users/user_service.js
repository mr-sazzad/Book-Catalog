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
const apiError_1 = __importDefault(require("../../errors/apiError"));
const prismaDB_1 = __importDefault(require("../../utils/prismaDB"));
const getAllUsers = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const decode = jsonwebtoken_1.default.decode(token);
    const isUserExist = yield prismaDB_1.default.user.findUnique({
        where: {
            id: decode.userId,
        },
    });
    if (!isUserExist) {
        throw new apiError_1.default(401, "Invalid Credentials");
    }
    if (decode.role !== "ADMIN") {
        throw new apiError_1.default(401, "Invalid Credentials");
    }
    const result = yield prismaDB_1.default.user.findMany({});
    return result;
});
const getSingleUser = (token, id) => __awaiter(void 0, void 0, void 0, function* () {
    const decode = jsonwebtoken_1.default.decode(token);
    const isExist = yield prismaDB_1.default.user.findUnique({
        where: {
            id: decode.userId,
        },
    });
    if (!isExist) {
        throw new apiError_1.default(401, "Invalid Credentials");
    }
    if (decode.role !== "ADMIN") {
        throw new apiError_1.default(401, "Invalid Credentials");
    }
    const result = yield prismaDB_1.default.user.findUnique({
        where: {
            id,
        },
    });
    return result;
});
const updateSingleUser = (token, id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const decode = jsonwebtoken_1.default.decode(token);
    const isExist = yield prismaDB_1.default.user.findUnique({
        where: {
            id: decode.userId,
        },
    });
    if (!isExist) {
        throw new apiError_1.default(401, "Invalid Credentials");
    }
    if (decode.role !== "ADMIN") {
        throw new apiError_1.default(401, "Invalid Credentials");
    }
    const isUserExist = yield prismaDB_1.default.user.findFirst({
        where: {
            id,
        },
    });
    if (!isUserExist) {
        throw new apiError_1.default(404, "Resource Not Found !");
    }
    const result = yield prismaDB_1.default.user.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
const deleteSingleUser = (token, id) => __awaiter(void 0, void 0, void 0, function* () {
    const decode = jsonwebtoken_1.default.decode(token);
    const isExist = yield prismaDB_1.default.user.findUnique({
        where: {
            id: decode.userId,
        },
    });
    if (!isExist) {
        throw new apiError_1.default(401, "Invalid Credentials");
    }
    if (decode.role !== "ADMIN") {
        throw new apiError_1.default(401, "Invalid Credentials");
    }
    const isUserExist = yield prismaDB_1.default.user.findFirst({
        where: {
            id,
        },
    });
    if (!isUserExist) {
        throw new apiError_1.default(404, "Resource Not Found !");
    }
    const result = yield prismaDB_1.default.user.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.userServices = {
    getAllUsers,
    getSingleUser,
    updateSingleUser,
    deleteSingleUser,
};
