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
const prismaDB_1 = __importDefault(require("../../utils/prismaDB"));
const createOrder = (userId, inputData) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderedBooks } = inputData;
    if (!Array.isArray(orderedBooks)) {
        throw new Error("orderedBooks must be an array");
    }
    const result = yield prismaDB_1.default.order.create({
        data: {
            userId: userId,
            orderedBooks: {
                create: orderedBooks.map((book) => ({
                    quantity: book.quantity,
                    user: {
                        connect: { id: userId },
                    },
                    book: {
                        connect: { id: book.bookId },
                    },
                })),
            },
        },
        include: {
            orderedBooks: true,
        },
    });
    return result;
});
const getWholeOrders = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prismaDB_1.default.user.findFirst({
        where: {
            id: userId,
        },
    });
    let result = [];
    if ((user === null || user === void 0 ? void 0 : user.role) === "CUSTOMER") {
        result = yield prismaDB_1.default.order.findMany({
            where: {
                userId,
            },
        });
    }
    else {
        result = yield prismaDB_1.default.order.findMany({});
    }
    return result;
});
exports.orderServices = {
    createOrder,
    getWholeOrders,
};
