import { Router } from "express";
import { AuthRoutes } from "../moduls/auth/auth_routes";
import { bookRoutes } from "../moduls/books/book_routes";
import { categoryRoutes } from "../moduls/categories/category_routes";
import { orderRoutes } from "../moduls/orders/order_routes";
import { ProfileRoutes } from "../moduls/profile/profile_routes";
import { userRouter } from "../moduls/users/user_routes";

const router = Router();

router.use("/auth", AuthRoutes);

router.use("/users", userRouter);

router.use("/categories", categoryRoutes);

router.use("/books", bookRoutes);

router.use("/orders", orderRoutes);

router.use("/profile", ProfileRoutes);

export const globalRouter = router;
