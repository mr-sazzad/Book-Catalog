import { RequestHandler } from "express";
import ApiError from "../../errors/apiError";
import { categoryServices } from "./category_services";

export const createCategory: RequestHandler = async (req, res, next) => {
  try {
    const data = req.body;
    const token = req.headers.authorization;

    if (!token) {
      throw new ApiError(409, "Unauthorized");
    }

    const result = await categoryServices.createCategory(token, data);

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: "Category Created Successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const getAllCategories: RequestHandler = async (req, res, next) => {
  try {
    const result = await categoryServices.getAllCategories();

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Categories retrieved Successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const getSingleCategory: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await categoryServices.getSingleCategory(id);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Category retrieved Successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const updateSingleCategory: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    const token = req.headers.authorization;

    if (!token) {
      throw new ApiError(409, "Unauthorized");
    }
    const result = await categoryServices.updateSingleCategory(
      token,
      id,
      payload
    );

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: "Category Updated Successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const deleteSingleCategory: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const token = req.headers.authorization;

    if (!token) {
      throw new ApiError(409, "Unauthorized");
    }
    const result = await categoryServices.deleteSingleCategory(token, id);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Category deleted Successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};
