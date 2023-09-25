import { Router } from "express";
import { roleAuth } from "../../middleware/roleAuth";
import {
  deleteSingleUser,
  getAllUsers,
  getSingleUser,
  updateSingleUser,
} from "./user_controller";

const router = Router();

router.get("/:id", roleAuth(["ADMIN"]), getSingleUser);
router.get("/", roleAuth(["ADMIN"]), getAllUsers);
router.patch("/:id", roleAuth(["ADMIN"]), updateSingleUser);
router.delete("/:id", roleAuth(["ADMIN"]), deleteSingleUser);

export const userRouter = router;
