import { Router } from "express";
import { categoryRoutes } from "../moduls/categories/category_routes";
import { userRouter } from "../moduls/users/user_routes";

const router = Router();

router.use("/users", userRouter);

router.use("/categories", categoryRoutes);

export const globalRouter = router;
