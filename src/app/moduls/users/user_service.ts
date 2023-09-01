import { User } from "@prisma/client";
import prisma from "../../utils/prismaDB";

const createSingleUser = async (data: User): Promise<User> => {
  const result = await prisma.user.create({
    data,
  });

  return result;
};

export const userServices = {
  createSingleUser,
};
