"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const roleAuth_1 = require("../../middleware/roleAuth");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const user_controller_1 = require("./user_controller");
const user_validation_1 = require("./user_validation");
const router = (0, express_1.Router)();
router.post("/auth/signup", (0, validateRequest_1.default)(user_validation_1.createUser), user_controller_1.createSingleUser);
router.post("/auth/signin", user_controller_1.loginUser);
router.get("/", (0, roleAuth_1.roleAuth)(["ADMIN"]), user_controller_1.getAllUsers);
router.get("/:id", (0, roleAuth_1.roleAuth)(["ADMIN"]), user_controller_1.getSingleUser);
router.patch("/:id", (0, roleAuth_1.roleAuth)(["ADMIN"]), user_controller_1.updateSingleUser);
router.delete("/:id", (0, roleAuth_1.roleAuth)(["ADMIN"]), user_controller_1.deleteSingleUser);
exports.userRouter = router;
