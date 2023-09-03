import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

import { Prisma } from "@prisma/client";
import { ZodError } from "zod";
import ApiError from "../errors/apiError";
import handleClientError, { IGenericErrorMessage } from "../errors/clientError";
import handleZodError from "../errors/handleZodError";
import handleValidationError from "../errors/validationError";

const globalErrorHandler: ErrorRequestHandler = (
  error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  process.env.NODE_ENV === "development" &&
    console.log(`🦀 globalErrorHandler ~~`, { error });

  let statusCode = 500;
  let message = "Something went wrong !";
  let errorMessages: IGenericErrorMessage[] = [];

  if (error instanceof Prisma.PrismaClientValidationError) {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const simplifiedError = handleClientError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error.message;
    errorMessages = error?.message
      ? [
          {
            path: "",
            message: error?.message,
          },
        ]
      : [];
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: "",
            message: error?.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
  });
};

export default globalErrorHandler;
