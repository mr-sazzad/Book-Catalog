import { RequestHandler } from "express";
import ApiError from "../../errors/apiError";
import { pick } from "../../utils/pick";
import { bookServices } from "./book_service";

export const createSingleBook: RequestHandler = async (req, res, next) => {
  try {
    const bookData = req.body;
    const token = req.headers.authorization;
    if (!token) {
      throw new ApiError(409, "Unauthorized");
    }
    const result = await bookServices.createSingleBook(token, bookData);

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: "Book Created Successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const getAllBooks: RequestHandler = async (req, res, next) => {
  try {
    const options = pick(req.query, ["page", "size", "sortBy", "sortOrder"]);

    const search = pick(req.query, [
      "searchTerm",
      "minPrice",
      "maxPrice",
      "category",
    ]);

    const result = await bookServices.getAllBooks(options, search);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Books Retrieved Successfully",
      meta: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const getSingleBook: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await bookServices.getSingleBook(id);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Book Retrieved Successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const updateSingleBook: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    const token = req.headers.authorization;

    if (!token) {
      throw new ApiError(409, "Unauthorized");
    }
    const result = await bookServices.updateSingleBook(token, id, payload);

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: "Book Updated Successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const deleteSingleBook: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const token = req.headers.authorization;

    if (!token) {
      throw new ApiError(409, "Unauthorized");
    }
    const result = await bookServices.deleteSingleBook(token, id);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Book Deleted Successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const getBooksByCategory: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await bookServices.getBooksByCategory(id);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Books with associated category data fetched successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};
