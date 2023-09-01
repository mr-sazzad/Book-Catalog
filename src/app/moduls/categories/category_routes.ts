import { Router } from "express";
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
router.patch("/:id", updateSingleCategory);
router.delete("/:id", deleteSingleCategory);

export const categoryRoutes = router;
