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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookServices = void 0;
const pagination_1 = __importDefault(require("../../utils/pagination"));
const prismaDB_1 = __importDefault(require("../../utils/prismaDB"));
const createSingleBook = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaDB_1.default.book.create({
        data,
        include: {
            category: true,
        },
    });
    return result;
});
const getAllBooks = (options, search) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, size, skip } = (0, pagination_1.default)(options);
    const { searchTerm, minPrice, maxPrice } = search, filterData = __rest(search, ["searchTerm", "minPrice", "maxPrice"]);
    const total = yield prismaDB_1.default.book.count();
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: ["title", "author", "genre", "publicationDate"].map((field) => ({
                [field]: {
                    contains: searchTerm,
                    mode: "insensitive",
                },
            })),
        });
    }
    if (maxPrice !== null) {
        andConditions.push({
            price: {
                lte: Number(maxPrice),
            },
        });
    }
    else if (minPrice !== null) {
        andConditions.push({
            price: {
                gte: Number(minPrice),
            },
        });
    }
    else if (minPrice !== null && maxPrice !== null) {
        andConditions.push({
            price: {
                gte: Number(minPrice),
                lte: Number(maxPrice),
            },
        });
    }
    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map((key) => ({
                [key]: {
                    equals: filterData[key],
                },
            })),
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prismaDB_1.default.book.findMany({
        skip,
        take: size,
        where: whereConditions,
        orderBy: options.sortBy && options.sortOrder
            ? {
                [options.sortBy]: options.sortOrder,
            }
            : {},
    });
    return {
        meta: {
            page: page,
            size: size,
            total,
        },
        data: result,
    };
});
const getBooksByCategory = (categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaDB_1.default.book.findMany({
        where: {
            categoryId,
        },
        include: {
            category: true,
        },
    });
    return result;
});
const getSingleBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prismaDB_1.default.book.findFirst({
        where: {
            id,
        },
    });
    if (!isExist) {
        throw new Error("Resource Not Found 🦀");
    }
    const result = prismaDB_1.default.book.findUnique({
        where: {
            id,
        },
    });
    return result;
});
const updateSingleBook = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prismaDB_1.default.book.findFirst({
        where: {
            id,
        },
    });
    if (!isExist) {
        throw new Error("Resource Not Found 🦀");
    }
    const result = prismaDB_1.default.book.update({
        where: {
            id,
        },
        data,
    });
    return result;
});
const deleteSingleBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prismaDB_1.default.book.findFirst({
        where: {
            id,
        },
    });
    if (!isExist) {
        throw new Error("Resource Not Found 🦀");
    }
    const result = yield prismaDB_1.default.book.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.bookServices = {
    getAllBooks,
    getSingleBook,
    updateSingleBook,
    deleteSingleBook,
    createSingleBook,
    getBooksByCategory,
};
