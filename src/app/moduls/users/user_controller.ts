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
