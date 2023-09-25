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
exports.orderServices = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const apiError_1 = __importDefault(require("../../errors/apiError"));
const prismaDB_1 = __importDefault(require("../../utils/prismaDB"));
const createOrder = (token, inputData) => __awaiter(void 0, void 0, void 0, function* () {
    const decode = jsonwebtoken_1.default.decode(token);
    const isExist = yield prismaDB_1.default.user.findUnique({
        where: {
            id: decode.userId,
        },
    });
    if (!isExist) {
        throw new apiError_1.default(401, "Invalid Credentials");
    }
    if (decode.role !== "CUSTOMER") {
        throw new apiError_1.default(401, "Invalid Credentials");
    }
    const { orderedBooks } = inputData;
    if (!Array.isArray(orderedBooks)) {
        throw new apiError_1.default(403, "orderedBooks must be an array");
    }
    const result = yield prismaDB_1.default.order.create({
        data: {
            userId: isExist.id,
            orderedBooks: {
                create: orderedBooks.map((book) => ({
                    quantity: book.quantity,
                    user: {
                        connect: { id: isExist.id },
                    },
                    book: {
                        connect: { id: book.bookId },
                    },
                })),
            },
        },
        include: {
            orderedBooks: {
                select: {
                    bookId: true,
                    quantity: true,
                },
            },
        },
    });
    return result;
});
const getWholeOrders = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const decoded = jsonwebtoken_1.default.decode(token);
    const isUserExist = yield prismaDB_1.default.user.findFirst({
        where: {
            id: decoded.userId,
        },
    });
    if (!isUserExist) {
        throw new apiError_1.default(403, "Unauthorized");
    }
    let result = [];
    if ((isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.role) === "CUSTOMER") {
        result = yield prismaDB_1.default.order.findMany({
            where: {
                userId: isUserExist.id,
            },
        });
    }
    else if ((isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.role) === "ADMIN") {
        result = yield prismaDB_1.default.order.findMany({});
    }
    else {
        throw new apiError_1.default(401, "Bad Request");
    }
    return result;
});
const getOrdersById = (token, id) => __awaiter(void 0, void 0, void 0, function* () {
    const decoded = jsonwebtoken_1.default.decode(token);
    const isUserExist = yield prismaDB_1.default.user.findUnique({
        where: {
            id: decoded.userId,
        },
    });
    if (!isUserExist) {
        throw new apiError_1.default(404, "User not found");
    }
    let order;
    if (isUserExist.role === "ADMIN") {
        order = yield prismaDB_1.default.order.findUnique({
            where: {
                id,
            },
        });
    }
    else if (isUserExist.role === "CUSTOMER") {
        try {
            order = yield prismaDB_1.default.order.findUnique({
                where: {
                    id,
                    userId: isUserExist.id,
                },
            });
        }
        catch (err) {
            throw new apiError_1.default(401, "Unable to find order");
        }
    }
    return order;
});
exports.orderServices = {
    createOrder,
    getWholeOrders,
    getOrdersById,
};
