"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileRoutes = void 0;
const express_1 = require("express");
const profile_controller_1 = require("./profile_controller");
const router = (0, express_1.Router)();
router.get("/", profile_controller_1.getProfile);
exports.ProfileRoutes = router;
