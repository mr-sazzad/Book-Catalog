import { RequestHandler } from "express";
import { orderServices } from "./order_services";

export const createOrder: RequestHandler = async (req, res, next) => {
  try {
    const token = req.headers.authorization as string;

    const orderData = req.body;
    const result = await orderServices.createOrder(token, orderData);

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: "Order Created Successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const getWholeOrders: RequestHandler = async (req, res, next) => {
  try {
    const token = req.headers.authorization as string;

    const result = await orderServices.getWholeOrders(token);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Order Retrieved Successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const getOrdersById: RequestHandler = async (req, res, next) => {
  try {
    const token = req.headers.authorization as string;
    const { id } = req.params;

    const result = await orderServices.getOrdersById(token, id);

    res.status(200).json({
      success: true,
      status: 200,
      message: "Orders retrieved successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};
