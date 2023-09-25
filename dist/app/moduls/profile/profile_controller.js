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
exports.getProfile = void 0;
const apiError_1 = __importDefault(require("../../errors/apiError"));
const profile_service_1 = require("./profile_service");
const getProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization;
        if (!token) {
            throw new apiError_1.default(409, "Unauthorized");
        }
        const profile = yield profile_service_1.profileService.getProfile(token);
        res.status(200).json({
            statusCode: 200,
            success: true,
            message: "Profile Retrieved Successfully",
            data: profile,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getProfile = getProfile;
