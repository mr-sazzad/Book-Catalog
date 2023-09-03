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
exports.getWholeOrders = exports.createOrder = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const order_services_1 = require("./order_services");
const createOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization;
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const id = yield decoded.id;
        const orderData = req.body;
        const result = yield order_services_1.orderServices.createOrder(id, orderData);
        res.status(201).json({
            statusCode: 201,
            success: true,
            message: "Order Created Successfully ✅",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.createOrder = createOrder;
const getWholeOrders = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization;
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const userId = yield decoded.id;
        const result = yield order_services_1.orderServices.getWholeOrders(userId);
        res.status(200).json({
            statusCode: 200,
            success: true,
            message: "Order Retrieved Successfully ✅",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getWholeOrders = getWholeOrders;
