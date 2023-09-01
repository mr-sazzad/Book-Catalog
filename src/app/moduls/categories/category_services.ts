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

export const categoryServices = {
  createCategory,
};
