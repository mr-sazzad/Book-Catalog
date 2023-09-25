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
exports.deleteSingleUser = exports.updateSingleUser = exports.getSingleUser = exports.getAllUsers = void 0;
const apiError_1 = __importDefault(require("../../errors/apiError"));
const user_service_1 = require("./user_service");
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    if (!token) {
        throw new apiError_1.default(409, "Unauthorized");
    }
    const result = yield user_service_1.userServices.getAllUsers(token);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Users Retrieved Successfully 👨‍👩‍👧‍👦",
        data: result,
    });
});
exports.getAllUsers = getAllUsers;
const getSingleUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const token = req.headers.authorization;
    if (!token) {
        throw new apiError_1.default(409, "Unauthorized");
    }
    const result = yield user_service_1.userServices.getSingleUser(token, id);
    res.status(200).json({
        statusCode: 200,
        success: true,
        message: "User Retrieved Successfully 🙍",
        data: result,
    });
});
exports.getSingleUser = getSingleUser;
const updateSingleUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const data = req.body;
    const token = req.headers.authorization;
    if (!token) {
        throw new apiError_1.default(409, "Unauthorized");
    }
    const result = yield user_service_1.userServices.updateSingleUser(token, id, data);
    res.status(201).json({
        success: true,
        statusCode: 201,
        message: "User Updated Successfully",
        data: result,
    });
});
exports.updateSingleUser = updateSingleUser;
const deleteSingleUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const token = req.headers.authorization;
    if (!token) {
        throw new apiError_1.default(409, "Unauthorized");
    }
    const result = yield user_service_1.userServices.deleteSingleUser(token, id);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "User Deleted Successfully",
        data: result,
    });
});
exports.deleteSingleUser = deleteSingleUser;
