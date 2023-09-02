import { RequestHandler } from "express";
import { pick } from "../../utils/pick";
import { bookServices } from "./book_service";

export const createSingleBook: RequestHandler = async (req, res, next) => {
  try {
    const bookData = req.body;
    const result = await bookServices.createSingleBook(bookData);

    res.status(201).json({
      statusCode: 201,
      success: true,
      message: "Book Created Successfully ✅",
      data: result,
    });
  } catch (err: any) {
    console.log(err);
    next(err);
  }
};

export const getAllBooks: RequestHandler = async (req, res, next) => {
  try {
    const options = pick(req.query, ["page", "size", "sortBy", "sortOrder"]);

    const search = pick(req.query, ["searchTerm"]);

    const result = await bookServices.getAllBooks(options);

    res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Books Retrieved Successfully 🦀",
      data: result,
    });
  } catch (err: any) {
    console.log(err);
    next(err);
  }
};

export const getSingleBook: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await bookServices.getSingleBook(id);

    res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Book Retrieved Successfully 🦀",
      data: result,
    });
  } catch (err: any) {
    console.log(err);
    next(err);
  }
};

export const updateSingleBook: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    const result = await bookServices.updateSingleBook(id, payload);

    res.status(201).json({
      statusCode: 201,
      success: true,
      message: "Book Updated Successfully ✅",
      data: result,
    });
  } catch (err: any) {
    console.log(err);
    next(err);
  }
};

export const deleteSingleBook: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await bookServices.deleteSingleBook(id);

    res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Book Deleted Successfully 🔴",
      data: result,
    });
  } catch (err: any) {
    console.log(err);
    next(err);
  }
};
