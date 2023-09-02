import { Router } from "express";
import { roleAuth } from "../../middleware/roleAuth";
import {
  createSingleUser,
  deleteSingleUser,
  getAllUsers,
  getSingleUser,
  loginUser,
  updateSingleUser,
} from "./user_controller";

const router = Router();

router.post("/auth/signup", createSingleUser);
router.post("/auth/signin", loginUser);
router.get("/", roleAuth(["ADMIN"]), getAllUsers);
router.get("/:id", getSingleUser);
router.patch("/:id", roleAuth(["ADMIN"]), updateSingleUser);
router.delete("/:id", roleAuth(["ADMIN"]), deleteSingleUser);

export const userRouter = router;
