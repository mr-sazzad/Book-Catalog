"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRoutes = void 0;
const express_1 = require("express");
const roleAuth_1 = require("../../middleware/roleAuth");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const category_controller_1 = require("./category_controller");
const category_validation_1 = __importDefault(require("./category_validation"));
const router = (0, express_1.Router)();
router.post("/create-category", (0, validateRequest_1.default)(category_validation_1.default), category_controller_1.createCategory);
router.get("/", category_controller_1.getAllCategories);
router.get("/:id", category_controller_1.getSingleCategory);
router.patch("/:id", (0, roleAuth_1.roleAuth)(["ADMIN"]), category_controller_1.updateSingleCategory);
router.delete("/:id", (0, roleAuth_1.roleAuth)(["ADMIN"]), category_controller_1.deleteSingleCategory);
exports.categoryRoutes = router;
