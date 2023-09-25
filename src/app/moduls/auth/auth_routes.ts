import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { createSingleUser, loginUser } from "./auth_controller";
import { createUser } from "./auth_validation";

const router = Router();

router.post("/signup", validateRequest(createUser), createSingleUser);
router.post("/signin", loginUser);

export const AuthRoutes = router;
