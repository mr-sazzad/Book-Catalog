"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRoutes = void 0;
const express_1 = require("express");
const roleAuth_1 = require("../../middleware/roleAuth");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const book_controller_1 = require("./book_controller");
const book_validation_1 = require("./book_validation");
const router = (0, express_1.Router)();
router.post("/create-book", (0, validateRequest_1.default)(book_validation_1.createBook), book_controller_1.createSingleBook);
router.get("/:id", book_controller_1.getSingleBook);
router.patch("/:id", (0, roleAuth_1.roleAuth)(["ADMIN"]), (0, validateRequest_1.default)(book_validation_1.updateBook), book_controller_1.updateSingleBook);
router.get("/:id/category", book_controller_1.getBooksByCategory);
router.delete("/:id", (0, roleAuth_1.roleAuth)(["ADMIN"]), book_controller_1.deleteSingleBook);
router.get("/", book_controller_1.getAllBooks);
exports.bookRoutes = router;
