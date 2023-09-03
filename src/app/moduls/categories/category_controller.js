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
exports.deleteSingleCategory = exports.updateSingleCategory = exports.getSingleCategory = exports.getAllCategories = exports.createCategory = void 0;
const category_services_1 = require("./category_services");
const createCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const result = yield category_services_1.categoryServices.createCategory(data);
        res.status(201).json({
            statusCode: 201,
            success: true,
            message: "Category Created Successfully ✅",
            data: result,
        });
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});
exports.createCategory = createCategory;
const getAllCategories = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield category_services_1.categoryServices.getAllCategories();
        res.status(200).json({
            statusCode: 200,
            success: true,
            message: "Categories retrieved Successfully 🦀",
            data: result,
        });
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});
exports.getAllCategories = getAllCategories;
const getSingleCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield category_services_1.categoryServices.getSingleCategory(id);
        res.status(200).json({
            statusCode: 200,
            success: true,
            message: "Categories retrieved Successfully 🦀",
            data: result,
        });
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});
exports.getSingleCategory = getSingleCategory;
const updateSingleCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const payload = req.body;
        const result = yield category_services_1.categoryServices.updateSingleCategory(id, payload);
        res.status(201).json({
            statusCode: 201,
            success: true,
            message: "Categories Updated Successfully ✅",
            data: result,
        });
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});
exports.updateSingleCategory = updateSingleCategory;
const deleteSingleCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield category_services_1.categoryServices.deleteSingleCategory(id);
        res.status(200).json({
            statusCode: 200,
            success: true,
            message: "Categories deleted Successfully 🔴",
            data: result,
        });
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});
exports.deleteSingleCategory = deleteSingleCategory;
