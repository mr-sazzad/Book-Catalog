import { Router } from "express";
import { roleAuth } from "../../middleware/roleAuth";
import {
  createSingleBook,
  deleteSingleBook,
  getAllBooks,
  getSingleBook,
  updateSingleBook,
} from "./book_controller";

const router = Router();

router.post("/create-book", createSingleBook);
router.get("/", getAllBooks);
router.get("/:id", getSingleBook);
router.patch("/:id", roleAuth(["ADMIN"]), updateSingleBook);
router.delete("/:id", roleAuth(["ADMIN"]), deleteSingleBook);

export const bookRoutes = router;
