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
