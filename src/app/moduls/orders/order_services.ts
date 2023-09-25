import { Order, OrderedBook } from "@prisma/client";
import jwt from "jsonwebtoken";
import ApiError from "../../errors/apiError";
import { TokenData } from "../../types";
import prisma from "../../utils/prismaDB";

const createOrder = async (
  token: string,
  inputData: { orderedBooks: OrderedBook[] }
): Promise<Order> => {
  const decode = jwt.decode(token) as TokenData;

  const isExist = await prisma.user.findUnique({
    where: {
      id: decode.userId,
    },
  });

  if (!isExist) {
    throw new ApiError(401, "Invalid Credentials");
  }

  if (decode.role !== "CUSTOMER") {
    throw new ApiError(401, "Invalid Credentials");
  }

  const { orderedBooks } = inputData;

  if (!Array.isArray(orderedBooks)) {
    throw new ApiError(403, "orderedBooks must be an array");
  }

  const result = await prisma.order.create({
    data: {
      userId: isExist.id,
      orderedBooks: {
        create: orderedBooks.map((book) => ({
          quantity: book.quantity,
          user: {
            connect: { id: isExist.id },
          },
          book: {
            connect: { id: book.bookId },
          },
        })),
      },
    },
    include: {
      orderedBooks: {
        select: {
          bookId: true,
          quantity: true,
        },
      },
    },
  });
  return result;
};

const getWholeOrders = async (token: string) => {
  const decoded = jwt.decode(token) as TokenData;

  const isUserExist = await prisma.user.findFirst({
    where: {
      id: decoded.userId,
    },
  });

  if (!isUserExist) {
    throw new ApiError(403, "Unauthorized");
  }

  let result = [];

  if (isUserExist?.role === "CUSTOMER") {
    result = await prisma.order.findMany({
      where: {
        userId: isUserExist.id,
      },
    });
  } else if (isUserExist?.role === "ADMIN") {
    result = await prisma.order.findMany({});
  } else {
    throw new ApiError(401, "Bad Request");
  }

  return result;
};

const getOrdersById = async (token: string, id: string) => {
  const decoded = jwt.decode(token) as TokenData;

  const isUserExist = await prisma.user.findUnique({
    where: {
      id: decoded.userId,
    },
  });

  if (!isUserExist) {
    throw new ApiError(404, "User not found");
  }

  let order;

  if (isUserExist.role === "ADMIN") {
    order = await prisma.order.findUnique({
      where: {
        id,
      },
    });
  } else if (isUserExist.role === "CUSTOMER") {
    try {
      order = await prisma.order.findUnique({
        where: {
          id,
          userId: isUserExist.id,
        },
      });
    } catch (err: any) {
      throw new ApiError(401, "Unable to find order");
    }
  }
  return order;
};

export const orderServices = {
  createOrder,
  getWholeOrders,
  getOrdersById,
};
