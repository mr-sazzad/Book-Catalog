import { Router } from "express";
import { roleAuth } from "../../middleware/roleAuth";
import { createOrder, getAllOrders, getOwnOrders } from "./order_controller";

const router = Router();

router.post("/create-order", roleAuth(["ADMIN", "CUSTOMER"]), createOrder);
router.get("/", getAllOrders);
router.get("/", getOwnOrders);

// roleAuth(["CUSTOMER"]),
export const orderRoutes = router;
