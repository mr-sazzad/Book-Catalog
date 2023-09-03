import { Router } from "express";
import { roleAuth } from "../../middleware/roleAuth";
import validateRequest from "../../middleware/validateRequest";
import {
  createSingleUser,
  deleteSingleUser,
  getAllUsers,
  getSingleUser,
  loginUser,
  updateSingleUser,
} from "./user_controller";
import { createUser } from "./user_validation";

const router = Router();

router.post("/auth/signup", validateRequest(createUser), createSingleUser);
router.post("/auth/signin", loginUser);
router.get("/", roleAuth(["ADMIN"]), getAllUsers);
router.get("/:id", roleAuth(["ADMIN"]), getSingleUser);
router.patch("/:id", roleAuth(["ADMIN"]), updateSingleUser);
router.delete("/:id", roleAuth(["ADMIN"]), deleteSingleUser);

export const userRouter = router;
