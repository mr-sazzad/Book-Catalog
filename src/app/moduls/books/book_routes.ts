import { Router } from "express";
import { roleAuth } from "../../middleware/roleAuth";
import validateRequest from "../../middleware/validateRequest";
import {
  createSingleBook,
  deleteSingleBook,
  getAllBooks,
  getBooksByCategory,
  getSingleBook,
  updateSingleBook,
} from "./book_controller";
import { createBook, updateBook } from "./book_validation";

const router = Router();

router.post("/create-book", validateRequest(createBook), createSingleBook);

router.get("/:id", getSingleBook);

router.patch(
  "/:id",
  roleAuth(["ADMIN"]),
  validateRequest(updateBook),
  updateSingleBook
);

router.get("/:id/category", getBooksByCategory);

router.delete("/:id", roleAuth(["ADMIN"]), deleteSingleBook);

router.get("/", getAllBooks);

export const bookRoutes = router;
