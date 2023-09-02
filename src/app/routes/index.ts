import { Router } from "express";
import { bookRoutes } from "../moduls/books/book_routes";
import { categoryRoutes } from "../moduls/categories/category_routes";
import { orderRoutes } from "../moduls/orders/order_routes";
import { userRouter } from "../moduls/users/user_routes";

const router = Router();

router.use("/users", userRouter);

router.use("/categories", categoryRoutes);

router.use("/books", bookRoutes);

router.use("/orders", orderRoutes);

export const globalRouter = router;
