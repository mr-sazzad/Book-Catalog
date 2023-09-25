import { RequestHandler } from "express";
import { authServices } from "./auth_service";

export const createSingleUser: RequestHandler = async (req, res, next) => {
  try {
    const user = req.body;

    const result = await authServices.createSingleUser(user);

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: "User Created Successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const loginUser: RequestHandler = async (req, res, next) => {
  const loginData = req.body;
  const result = await authServices.loginUser(loginData);

  res.status(201).json({
    success: true,
    statusCode: 200,
    message: "User Logged In Successfully",
    token: result,
  });
};
