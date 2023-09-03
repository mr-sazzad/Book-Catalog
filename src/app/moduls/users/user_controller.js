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
exports.deleteSingleUser = exports.updateSingleUser = exports.getSingleUser = exports.getAllUsers = exports.loginUser = exports.createSingleUser = void 0;
const user_service_1 = require("./user_service");
const createSingleUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        const result = yield user_service_1.userServices.createSingleUser(user);
        res.status(201).json({
            statusCode: 201,
            success: true,
            message: "User Created Successfully ✅",
            data: result,
        });
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});
exports.createSingleUser = createSingleUser;
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const loginData = req.body;
    const result = yield user_service_1.userServices.loginUser(loginData);
    res.status(201).json({
        statusCode: 201,
        success: true,
        message: "User Logged In Successfully ✅",
        data: result,
    });
});
exports.loginUser = loginUser;
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userServices.getAllUsers();
    res.status(200).json({
        statusCode: 200,
        success: true,
        message: "Users Retrieved Successfully 👨‍👩‍👧‍👦",
        data: result,
    });
});
exports.getAllUsers = getAllUsers;
const getSingleUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield user_service_1.userServices.getSingleUser(id);
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
    const result = yield user_service_1.userServices.updateSingleUser(id, data);
    res.status(201).json({
        statusCode: 201,
        success: true,
        message: "User Updated Successfully ✅",
        data: result,
    });
});
exports.updateSingleUser = updateSingleUser;
const deleteSingleUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield user_service_1.userServices.deleteSingleUser(id);
    res.status(200).json({
        statusCode: 200,
        success: true,
        message: "User Deleted Successfully 🔴",
        data: result,
    });
});
exports.deleteSingleUser = deleteSingleUser;
