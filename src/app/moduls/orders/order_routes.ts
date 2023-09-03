import { Router } from "express";
import { roleAuth } from "../../middleware/roleAuth";
import validateRequest from "../../middleware/validateRequest";
import { createOrder, getAllOrders, getOwnOrders } from "./order_controller";
import { create } from "./orders_validation";

const router = Router();

router.post(
  "/create-order",
  roleAuth(["ADMIN", "CUSTOMER"]),
  validateRequest(create),
  createOrder
);

router.get("/", getAllOrders);
router.get("/", getOwnOrders);

// roleAuth(["CUSTOMER"]),
export const orderRoutes = router;
