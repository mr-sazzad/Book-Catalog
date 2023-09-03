import { Router } from "express";
import { roleAuth } from "../../middleware/roleAuth";

import validateRequest from "../../middleware/validateRequest";
import {
  createCategory,
  deleteSingleCategory,
  getAllCategories,
  getSingleCategory,
  updateSingleCategory,
} from "./category_controller";
import create from "./category_validation";

const router = Router();

router.post("/create-category", validateRequest(create), createCategory);
router.get("/", getAllCategories);
router.get("/:id", getSingleCategory);
router.patch("/:id", roleAuth(["ADMIN"]), updateSingleCategory);
router.delete("/:id", roleAuth(["ADMIN"]), deleteSingleCategory);

export const categoryRoutes = router;
