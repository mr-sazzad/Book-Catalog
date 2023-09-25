import { RequestHandler } from "express";
import ApiError from "../../errors/apiError";
import { userServices } from "./user_service";

export const getAllUsers: RequestHandler = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    throw new ApiError(409, "Unauthorized");
  }
  const result = await userServices.getAllUsers(token);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Users Retrieved Successfully 👨‍👩‍👧‍👦",
    data: result,
  });
};

export const getSingleUser: RequestHandler = async (req, res, next) => {
  const id = req.params.id;
  const token = req.headers.authorization;
  if (!token) {
    throw new ApiError(409, "Unauthorized");
  }
  const result = await userServices.getSingleUser(token, id);

  res.status(200).json({
    statusCode: 200,
    success: true,
    message: "User Retrieved Successfully 🙍",
    data: result,
  });
};

export const updateSingleUser: RequestHandler = async (req, res, next) => {
  const id = req.params.id;
  const data = req.body;
  const token = req.headers.authorization;

  if (!token) {
    throw new ApiError(409, "Unauthorized");
  }
  const result = await userServices.updateSingleUser(token, id, data);

  res.status(201).json({
    success: true,
    statusCode: 201,
    message: "User Updated Successfully",
    data: result,
  });
};

export const deleteSingleUser: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const token = req.headers.authorization;

  if (!token) {
    throw new ApiError(409, "Unauthorized");
  }
  const result = await userServices.deleteSingleUser(token, id);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "User Deleted Successfully",
    data: result,
  });
};
