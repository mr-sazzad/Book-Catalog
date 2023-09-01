import { Category } from "@prisma/client";
import prisma from "../../utils/prismaDB";

const createCategory = async (data: Category): Promise<Category> => {
  const title = data.title;

  const isExist = await prisma.category.findFirst({
    where: {
      title,
    },
  });

  if (isExist) {
    throw new Error("Category already Exist 🔴");
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
  });

  if (!isExist) {
    throw new Error("Category Not Found 🔴");
  }

  const result = await prisma.category.findUnique({
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
};
