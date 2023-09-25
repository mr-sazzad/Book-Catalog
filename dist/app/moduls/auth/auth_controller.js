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
exports.loginUser = exports.createSingleUser = void 0;
const auth_service_1 = require("./auth_service");
const createSingleUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        const result = yield auth_service_1.authServices.createSingleUser(user);
        res.status(201).json({
            success: true,
            statusCode: 201,
            message: "User Created Successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.createSingleUser = createSingleUser;
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const loginData = req.body;
    const result = yield auth_service_1.authServices.loginUser(loginData);
    res.status(201).json({
        success: true,
        statusCode: 200,
        message: "User Logged In Successfully",
        token: result,
    });
});
exports.loginUser = loginUser;
