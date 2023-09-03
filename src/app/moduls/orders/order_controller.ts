import { RequestHandler } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { orderServices } from "./order_services";

export const createOrder: RequestHandler = async (req, res, next) => {
  try {
    const token = req.headers.authorization as string;
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    const id = await decoded.id;

    const orderData = req.body;
    const result = await orderServices.createOrder(id, orderData);

    res.status(201).json({
      statusCode: 201,
      success: true,
      message: "Order Created Successfully ✅",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const getWholeOrders: RequestHandler = async (req, res, next) => {
  try {
    const token = req.headers.authorization as string;
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    const userId = await decoded.id;

    const result = await orderServices.getWholeOrders(userId);

    res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Order Retrieved Successfully ✅",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
