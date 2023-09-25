import { RequestHandler } from "express";
import ApiError from "../../errors/apiError";
import { profileService } from "./profile_service";

export const getProfile: RequestHandler = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      throw new ApiError(409, "Unauthorized");
    }

    const profile = await profileService.getProfile(token);

    res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Profile Retrieved Successfully",
      data: profile,
    });
  } catch (err: any) {
    next(err);
  }
};
