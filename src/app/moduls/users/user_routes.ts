import { Router } from "express";
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
router.get("/", getAllUsers);
router.get("/:id", getSingleUser);
router.patch("/:id", updateSingleUser);
router.delete("/:id", deleteSingleUser);

export const userRouter = router;
