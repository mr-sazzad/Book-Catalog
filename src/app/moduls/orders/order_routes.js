"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRoutes = void 0;
const express_1 = require("express");
const roleAuth_1 = require("../../middleware/roleAuth");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const order_controller_1 = require("./order_controller");
const orders_validation_1 = require("./orders_validation");
const router = (0, express_1.Router)();
router.post("/create-order", (0, roleAuth_1.roleAuth)(["CUSTOMER"]), (0, validateRequest_1.default)(orders_validation_1.create), order_controller_1.createOrder);
router.get("/", (0, roleAuth_1.roleAuth)(["CUSTOMER", "ADMIN"]), order_controller_1.getWholeOrders);
exports.orderRoutes = router;
