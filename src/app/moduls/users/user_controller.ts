import { RequestHandler } from "express";
import { userServices } from "./user_service";

export const createSingleUser: RequestHandler = async (req, res, next) => {
  try {
    const user = req.body;

    const result = await userServices.createSingleUser(user);

    res.status(201).json({
      statusCode: 201,
      success: true,
      message: "User Created Successfully ✅",
      data: result,
    });
  } catch (err: any) {
    console.log(err);
    next(err);
  }
};

export const loginUser: RequestHandler = async (req, res, next) => {
  const loginData = req.body;
  const result = await userServices.loginUser(loginData);

  res.status(201).json({
    statusCode: 201,
    success: true,
    message: "User Logged In Successfully ✅",
    data: result,
  });
};

export const getAllUsers: RequestHandler = async (req, res, next) => {
  const result = await userServices.getAllUsers();

  res.status(200).json({
    statusCode: 201,
    success: true,
    message: "Users Retrieved Successfully 👨‍👩‍👧‍👦",
    data: result,
  });
};

export const getSingleUser: RequestHandler = async (req, res, next) => {
  const id = req.params.id;
  const result = await userServices.getSingleUser(id);

  res.status(200).json({
    statusCode: 201,
    success: true,
    message: "User Retrieved Successfully 🙍",
    data: result,
  });
};

export const updateSingleUser: RequestHandler = async (req, res, next) => {
  const id = req.params.id;
  const data = req.body;
  const result = await userServices.updateSingleUser(id, data);

  res.status(200).json({
    statusCode: 201,
    success: true,
    message: "User Updated Successfully ✅",
    data: result,
  });
};

export const deleteSingleUser: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const result = await userServices.deleteSingleUser(id);

  res.status(200).json({
    statusCode: 201,
    success: true,
    message: "User Deleted Successfully 🔴",
    data: result,
  });
};
