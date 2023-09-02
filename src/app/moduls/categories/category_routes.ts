import { Router } from "express";
import { roleAuth } from "../../middleware/roleAuth";
import {
  createCategory,
  deleteSingleCategory,
  getAllCategories,
  getSingleCategory,
  updateSingleCategory,
} from "./category_controller";

const router = Router();

router.post("/create-category", createCategory);
router.get("/", getAllCategories);
router.get("/:id", getSingleCategory);
router.patch("/:id", roleAuth(["ADMIN"]), updateSingleCategory);
router.delete("/:id", roleAuth(["ADMIN"]), deleteSingleCategory);

export const categoryRoutes = router;
