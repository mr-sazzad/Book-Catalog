import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import ApiError from "../../errors/apiError";
import { TokenData } from "../../types";
import prisma from "../../utils/prismaDB";

const getAllUsers = async (token: string): Promise<User[]> => {
  const decode = jwt.decode(token) as TokenData;

  const isUserExist = await prisma.user.findUnique({
    where: {
      id: decode.userId,
    },
  });

  if (!isUserExist) {
    throw new ApiError(401, "Invalid Credentials");
  }

  if (decode.role !== "ADMIN") {
    throw new ApiError(401, "Invalid Credentials");
  }

  const result = await prisma.user.findMany({});

  return result;
};

const getSingleUser = async (
  token: string,
  id: string
): Promise<User | null> => {
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

  const result = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  return result;
};

const updateSingleUser = async (
  token: string,
  id: string,
  payload: Partial<User>
): Promise<User> => {
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

  const isUserExist = await prisma.user.findFirst({
    where: {
      id,
    },
  });

  if (!isUserExist) {
    throw new ApiError(404, "Resource Not Found !");
  }

  const result = await prisma.user.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteSingleUser = async (token: string, id: string): Promise<User> => {
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

  const isUserExist = await prisma.user.findFirst({
    where: {
      id,
    },
  });

  if (!isUserExist) {
    throw new ApiError(404, "Resource Not Found !");
  }

  const result = await prisma.user.delete({
    where: {
      id,
    },
  });
  return result;
};

export const userServices = {
  getAllUsers,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
};
