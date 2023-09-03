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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSingleBook = exports.updateSingleBook = exports.getSingleBook = exports.getAllBooks = exports.createSingleBook = void 0;
const pick_1 = require("../../utils/pick");
const book_service_1 = require("./book_service");
const createSingleBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookData = req.body;
        const result = yield book_service_1.bookServices.createSingleBook(bookData);
        res.status(201).json({
            statusCode: 201,
            success: true,
            message: "Book Created Successfully ✅",
            data: result,
        });
    }
    catch (err) {
        console.log(err);
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
            statusCode: 200,
            success: true,
            message: "Books Retrieved Successfully 🦀",
            meta: result,
        });
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});
exports.getAllBooks = getAllBooks;
const getSingleBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield book_service_1.bookServices.getSingleBook(id);
        res.status(200).json({
            statusCode: 200,
            success: true,
            message: "Book Retrieved Successfully 🦀",
            data: result,
        });
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});
exports.getSingleBook = getSingleBook;
const updateSingleBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const payload = req.body;
        const result = yield book_service_1.bookServices.updateSingleBook(id, payload);
        res.status(201).json({
            statusCode: 201,
            success: true,
            message: "Book Updated Successfully ✅",
            data: result,
        });
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});
exports.updateSingleBook = updateSingleBook;
const deleteSingleBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield book_service_1.bookServices.deleteSingleBook(id);
        res.status(200).json({
            statusCode: 200,
            success: true,
            message: "Book Deleted Successfully 🔴",
            data: result,
        });
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});
exports.deleteSingleBook = deleteSingleBook;
