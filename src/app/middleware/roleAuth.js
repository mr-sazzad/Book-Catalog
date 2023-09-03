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
exports.roleAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prismaDB_1 = __importDefault(require("../utils/prismaDB"));
const secret = process.env.JWT_SECRET;
const roleAuth = (requiredRoles) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ error: "Unauthorized " });
        }
        let decoded;
        try {
            decoded = jsonwebtoken_1.default.verify(token, secret);
        }
        catch (error) {
            return res.status(401).json({ error: "Unauthorized 🦀" });
        }
        const email = decoded.email;
        const user = yield prismaDB_1.default.user.findUnique({
            where: {
                email,
            },
        });
        if (!user) {
            return res.status(401).json({ error: "Unauthorized 🔴" });
        }
        const isAuthenticated = requiredRoles.some((role) => user.role.includes(role));
        if (!isAuthenticated) {
            return res.status(403).json({ error: "Forbidden" });
        }
        next();
    }
    catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ error: "Something went wrong" });
    }
});
exports.roleAuth = roleAuth;
