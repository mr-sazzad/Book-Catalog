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
exports.getOrdersById = exports.getWholeOrders = exports.createOrder = void 0;
const order_services_1 = require("./order_services");
const createOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization;
        const orderData = req.body;
        const result = yield order_services_1.orderServices.createOrder(token, orderData);
        res.status(201).json({
            success: true,
            statusCode: 201,
            message: "Order Created Successfully",
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
        const result = yield order_services_1.orderServices.getWholeOrders(token);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Order Retrieved Successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getWholeOrders = getWholeOrders;
const getOrdersById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization;
        const { id } = req.params;
        const result = yield order_services_1.orderServices.getOrdersById(token, id);
        res.status(200).json({
            success: true,
            status: 200,
            message: "Orders retrieved successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getOrdersById = getOrdersById;
