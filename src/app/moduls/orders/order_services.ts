import { Order, OrderedBook } from "@prisma/client";
import prisma from "../../utils/prismaDB";

const createOrder = async (
  userId: string,
  inputData: { orderedBooks: OrderedBook[] }
): Promise<Order> => {
  const { orderedBooks } = inputData;

  if (!Array.isArray(orderedBooks)) {
    throw new Error("orderedBooks must be an array");
  }

  const result = await prisma.order.create({
    data: {
      userId: userId,
      orderedBooks: {
        create: orderedBooks.map((book) => ({
          quantity: book.quantity,
          user: {
            connect: { id: userId },
          },
          book: {
            connect: { id: book.bookId },
          },
        })),
      },
    },
    include: {
      orderedBooks: true,
    },
  });
  return result;
};

const getWholeOrders = async (userId: string) => {
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  let result = [];

  if (user?.role === "CUSTOMER") {
    result = await prisma.order.findMany({
      where: {
        userId,
      },
    });
  } else {
    result = await prisma.order.findMany({});
  }

  return result;
};

export const orderServices = {
  createOrder,
  getWholeOrders,
};
