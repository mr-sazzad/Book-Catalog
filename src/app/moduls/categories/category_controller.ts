import { RequestHandler } from "express";
import { categoryServices } from "./category_services";

export const createCategory: RequestHandler = async (req, res, next) => {
  try {
    const data = req.body;

    const result = await categoryServices.createCategory(data);

    res.status(201).json({
      statusCode: 201,
      success: true,
      message: "Category Created Successfully ✅",
      data: result,
    });
  } catch (err: any) {
    console.log(err);
    next(err);
  }
};

export const getAllCategories: RequestHandler = async (req, res, next) => {
  try {
    const result = await categoryServices.getAllCategories();

    res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Categories retrieved Successfully 🦀",
      data: result,
    });
  } catch (err: any) {
    console.log(err);
    next(err);
  }
};

export const getSingleCategory: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await categoryServices.getSingleCategory(id);

    res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Categories retrieved Successfully 🦀",
      data: result,
    });
  } catch (err: any) {
    console.log(err);
    next(err);
  }
};
