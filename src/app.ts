import cors from "cors";
import express, { Request, Response, urlencoded } from "express";

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

export default app;
