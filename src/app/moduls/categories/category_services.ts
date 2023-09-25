import { Category } from "@prisma/client";
import jwt from "jsonwebtoken";
import ApiError from "../../errors/apiError";
import { TokenData } from "../../types";
import prisma from "../../utils/prismaDB";

const createCategory = async (
  token: string,
  data: Category
): Promise<Category> => {
  const title = data.title;
  const decode = jwt.decode(token) as TokenData;

  const isExist = await prisma.user.findUnique({
    where: {
      id: decode.userId,
    },
  });

  if (!isExist) {
    throw new ApiError(401, "Invalid Credentials");
  }

  if (decode.role !== "ADMIN") {
    throw new ApiError(401, "Invalid Credentials");
  }

  const isCategoryExist = await prisma.category.findFirst({
    where: {
      title,
    },
  });

  if (isCategoryExist) {
    throw new ApiError(409, "Category already Exist");
  }

  const result = await prisma.category.create({
    data,
  });

  return result;
};

const getAllCategories = async (): Promise<Category[] | null> => {
  const result = await prisma.category.findMany({});

  return result;
};

const getSingleCategory = async (id: string): Promise<Category | null> => {
  const isExist = await prisma.category.findFirst({
    where: {
      id,
    },
    include: {
      books: true,
    },
  });

  if (!isExist) {
    throw new ApiError(404, "Category Not Found");
  }

  const result = await prisma.category.findUnique({
    where: {
      id,
    },
  });

  return result;
};

const updateSingleCategory = async (
  token: string,
  id: string,
  data: Partial<Category>
): Promise<Category | null> => {
  const decode = jwt.decode(token) as TokenData;

  const isExist = await prisma.user.findUnique({
    where: {
      id: decode.userId,
    },
  });

  if (!isExist) {
    throw new ApiError(401, "Invalid Credentials");
  }

  if (decode.role !== "ADMIN") {
    throw new ApiError(401, "Invalid Credentials");
  }
  const isCategoryExist = await prisma.category.findFirst({
    where: {
      id,
    },
  });

  if (!isCategoryExist) {
    throw new ApiError(404, "Category Not Found");
  }

  const result = await prisma.category.update({
    where: {
      id,
    },
    data,
  });

  return result;
};

const deleteSingleCategory = async (
  token: string,
  id: string
): Promise<Category | null> => {
  const decode = jwt.decode(token) as TokenData;

  const isExist = await prisma.user.findUnique({
    where: {
      id: decode.userId,
    },
  });

  if (!isExist) {
    throw new ApiError(401, "Invalid Credentials");
  }

  if (decode.role !== "ADMIN") {
    throw new ApiError(401, "Invalid Credentials");
  }

  const isCategoryExist = await prisma.category.findFirst({
    where: {
      id,
    },
  });

  if (!isCategoryExist) {
    throw new ApiError(404, "Category Not Found");
  }

  const books = await prisma.book.findMany({
    where: {
      categoryId: id,
    },
  });

  await Promise.all(
    books.map(async (book) => {
      await prisma.book.delete({
        where: {
          id: book.id,
        },
      });
    })
  );

  const result = await prisma.category.delete({
    where: {
      id,
    },
  });

  return result;
};

export const categoryServices = {
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateSingleCategory,
  deleteSingleCategory,
};
