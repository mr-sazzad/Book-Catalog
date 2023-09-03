import cors from "cors";
import express, { NextFunction, Request, Response, urlencoded } from "express";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import { globalRouter } from "./app/routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use(urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome To This Project 🦀",
    success: true,
    author: "Sazzad Karim",
    Date: "01/09/23",
    name: "Assignment-8",
    tools: "Prisma Express PostgreSQL Typescript",

    routes: "base url -> http://localhost:5000/api/v1",
    users: " base url -> http://localhost:5000/api/v1/users 🦀",
    category: " base url -> http://localhost:5000/api/v1/categories ⚖️",
  });
});

app.use("/api/v1", globalRouter);

//global error handler
app.use(globalErrorHandler);

//handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: "Not Found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API Not Found",
      },
    ],
  });
  next();
});

export default app;
