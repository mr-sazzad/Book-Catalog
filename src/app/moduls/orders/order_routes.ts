import { Router } from "express";
import { roleAuth } from "../../middleware/roleAuth";
import validateRequest from "../../middleware/validateRequest";
import { createOrder, getWholeOrders } from "./order_controller";
import { create } from "./orders_validation";

const router = Router();

router.post(
  "/create-order",
  roleAuth(["CUSTOMER"]),
  validateRequest(create),
  createOrder
);

router.get("/", roleAuth(["CUSTOMER", "ADMIN"]), getWholeOrders);

export const orderRoutes = router;
