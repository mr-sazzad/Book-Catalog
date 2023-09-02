import { Book } from "@prisma/client";
import { IOptions } from "../../types";
import prisma from "../../utils/prismaDB";

const createSingleBook = async (data: Book): Promise<Book> => {
  const result = await prisma.book.create({
    data,
    include: {
      category: true,
    },
  });
  return result;
};

const getAllBooks = async (options: IOptions): Promise<Book[] | null> => {
  const skip = Number(options.page) - 1 + Number(options.size);

  const result = await prisma.book.findMany({
    take: Number(options.size),
    skip,
  });

  return result;
};

const getBooksByCategory = async (categoryId: string) => {
  const result = await prisma.book.findMany({
    where: {
      categoryId,
    },
    include: {
      category: true,
    },
  });

  return result;
};

const getSingleBook = async (id: string): Promise<Book | null> => {
  const isExist = await prisma.book.findFirst({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new Error("Resource Not Found 🦀");
  }

  const result = prisma.book.findUnique({
    where: {
      id,
    },
  });

  return result;
};

const updateSingleBook = async (
  id: string,
  data: Partial<Book>
): Promise<Book> => {
  const isExist = await prisma.book.findFirst({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new Error("Resource Not Found 🦀");
  }

  const result = prisma.book.update({
    where: {
      id,
    },
    data,
  });

  return result;
};

const deleteSingleBook = async (id: string): Promise<Book> => {
  const isExist = await prisma.book.findFirst({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new Error("Resource Not Found 🦀");
  }

  const result = await prisma.book.delete({
    where: {
      id,
    },
  });
  return result;
};

export const bookServices = {
  getAllBooks,
  getSingleBook,
  updateSingleBook,
  deleteSingleBook,
  createSingleBook,
  getBooksByCategory,
};
