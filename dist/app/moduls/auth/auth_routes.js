"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const auth_controller_1 = require("./auth_controller");
const auth_validation_1 = require("./auth_validation");
const router = (0, express_1.Router)();
router.post("/signup", (0, validateRequest_1.default)(auth_validation_1.createUser), auth_controller_1.createSingleUser);
router.post("/signin", auth_controller_1.loginUser);
exports.AuthRoutes = router;
