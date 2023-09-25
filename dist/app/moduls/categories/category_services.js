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
exports.categoryServices = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const apiError_1 = __importDefault(require("../../errors/apiError"));
const prismaDB_1 = __importDefault(require("../../utils/prismaDB"));
const createCategory = (token, data) => __awaiter(void 0, void 0, void 0, function* () {
    const title = data.title;
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
    const isCategoryExist = yield prismaDB_1.default.category.findFirst({
        where: {
            title,
        },
    });
    if (isCategoryExist) {
        throw new apiError_1.default(409, "Category already Exist");
    }
    const result = yield prismaDB_1.default.category.create({
        data,
    });
    return result;
});
const getAllCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaDB_1.default.category.findMany({});
    return result;
});
const getSingleCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prismaDB_1.default.category.findFirst({
        where: {
            id,
        },
        include: {
            books: true,
        },
    });
    if (!isExist) {
        throw new apiError_1.default(404, "Category Not Found");
    }
    const result = yield prismaDB_1.default.category.findUnique({
        where: {
            id,
        },
    });
    return result;
});
const updateSingleCategory = (token, id, data) => __awaiter(void 0, void 0, void 0, function* () {
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
    const isCategoryExist = yield prismaDB_1.default.category.findFirst({
        where: {
            id,
        },
    });
    if (!isCategoryExist) {
        throw new apiError_1.default(404, "Category Not Found");
    }
    const result = yield prismaDB_1.default.category.update({
        where: {
            id,
        },
        data,
    });
    return result;
});
const deleteSingleCategory = (token, id) => __awaiter(void 0, void 0, void 0, function* () {
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
    const isCategoryExist = yield prismaDB_1.default.category.findFirst({
        where: {
            id,
        },
    });
    if (!isCategoryExist) {
        throw new apiError_1.default(404, "Category Not Found");
    }
    const books = yield prismaDB_1.default.book.findMany({
        where: {
            categoryId: id,
        },
    });
    yield Promise.all(books.map((book) => __awaiter(void 0, void 0, void 0, function* () {
        yield prismaDB_1.default.book.delete({
            where: {
                id: book.id,
            },
        });
    })));
    const result = yield prismaDB_1.default.category.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.categoryServices = {
    createCategory,
    getAllCategories,
    getSingleCategory,
    updateSingleCategory,
    deleteSingleCategory,
};
