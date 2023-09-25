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
exports.getBooksByCategory = exports.deleteSingleBook = exports.updateSingleBook = exports.getSingleBook = exports.getAllBooks = exports.createSingleBook = void 0;
const apiError_1 = __importDefault(require("../../errors/apiError"));
const pick_1 = require("../../utils/pick");
const book_service_1 = require("./book_service");
const createSingleBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookData = req.body;
        const token = req.headers.authorization;
        if (!token) {
            throw new apiError_1.default(409, "Unauthorized");
        }
        const result = yield book_service_1.bookServices.createSingleBook(token, bookData);
        res.status(201).json({
            success: true,
            statusCode: 201,
            message: "Book Created Successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.createSingleBook = createSingleBook;
const getAllBooks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const options = (0, pick_1.pick)(req.query, ["page", "size", "sortBy", "sortOrder"]);
        const search = (0, pick_1.pick)(req.query, [
            "searchTerm",
            "minPrice",
            "maxPrice",
            "category",
        ]);
        const result = yield book_service_1.bookServices.getAllBooks(options, search);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Books Retrieved Successfully",
            meta: result,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getAllBooks = getAllBooks;
const getSingleBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield book_service_1.bookServices.getSingleBook(id);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Book Retrieved Successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getSingleBook = getSingleBook;
const updateSingleBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const payload = req.body;
        const token = req.headers.authorization;
        if (!token) {
            throw new apiError_1.default(409, "Unauthorized");
        }
        const result = yield book_service_1.bookServices.updateSingleBook(token, id, payload);
        res.status(201).json({
            success: true,
            statusCode: 201,
            message: "Book Updated Successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.updateSingleBook = updateSingleBook;
const deleteSingleBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const token = req.headers.authorization;
        if (!token) {
            throw new apiError_1.default(409, "Unauthorized");
        }
        const result = yield book_service_1.bookServices.deleteSingleBook(token, id);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Book Deleted Successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.deleteSingleBook = deleteSingleBook;
const getBooksByCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield book_service_1.bookServices.getBooksByCategory(id);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Books with associated category data fetched successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getBooksByCategory = getBooksByCategory;
