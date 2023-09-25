import jwt from "jsonwebtoken";
import ApiError from "../../errors/apiError";
import { TokenData } from "../../types";
import prisma from "../../utils/prismaDB";

const getProfile = async (token: string) => {
  const decode = jwt.decode(token) as TokenData;

  const isExist = await prisma.user.findUnique({
    where: {
      id: decode.userId,
    },
  });

  if (!isExist) {
    throw new ApiError(401, "Invalid Credentials");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: decode.userId,
    },
  });

  return user;
};

export const profileService = {
  getProfile,
};
