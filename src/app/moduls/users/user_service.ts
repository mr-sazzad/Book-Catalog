import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import prisma from "../../utils/prismaDB";

const secret = process.env.JWT_SECRET;

const createSingleUser = async (data: User): Promise<User> => {
  const result = await prisma.user.create({
    data,
  });

  return result;
};

const loginUser = async (data: Partial<User>): Promise<string> => {
  const email = data.email;

  const isExist = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!isExist) {
    throw new Error("Not Authenticated");
  }

  const jwt_payload = {
    id: isExist.id,
    email: isExist.email,
    role: isExist.role,
    address: isExist.address,
  };

  const token = jwt.sign(jwt_payload, secret as string, { expiresIn: "365d" });

  return token;
};

const getAllUsers = async (): Promise<User[]> => {
  const result = await prisma.user.findMany({});

  return result;
};

const getSingleUser = async (id: string): Promise<User | null> => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  return result;
};

const updateSingleUser = async (
  id: string,
  payload: Partial<User>
): Promise<User> => {
  const isExist = await prisma.user.findFirst({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new Error("Resource Not Found ! 🦀");
  }

  const result = await prisma.user.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteSingleUser = async (id: string): Promise<User> => {
  const isExist = await prisma.user.findFirst({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new Error("Resource Not Found ! 🦀");
  }

  const result = await prisma.user.delete({
    where: {
      id,
    },
  });
  return result;
};

export const userServices = {
  createSingleUser,
  loginUser,
  getAllUsers,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
};
