"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBook = exports.createBook = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createBook = zod_1.default.object({
    body: zod_1.default.object({
        title: zod_1.default.string({ required_error: "Title Is Required Filed" }),
        author: zod_1.default.string({ required_error: "Author Is Required Filed" }),
        price: zod_1.default.number({ required_error: "Price Is Required Filed" }),
        genre: zod_1.default.string({ required_error: "Genre Is Required Filed" }),
        publicationDate: zod_1.default.string({
            required_error: "Publication Date is Required Filed",
        }),
        categoryId: zod_1.default.string({ required_error: "Category Id Filed Is Required" }),
    }),
});
exports.updateBook = zod_1.default.object({
    body: zod_1.default.object({
        title: zod_1.default.string().optional(),
        author: zod_1.default.string().optional(),
        price: zod_1.default.number().optional(),
        genre: zod_1.default.string().optional(),
        publicationDate: zod_1.default.string().optional(),
        categoryId: zod_1.default.string().optional(),
    }),
});
