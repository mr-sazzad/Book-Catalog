import { Router } from "express";
import { roleAuth } from "../../middleware/roleAuth";
import validateRequest from "../../middleware/validateRequest";
import {
  createSingleBook,
  deleteSingleBook,
  getAllBooks,
  getSingleBook,
  updateSingleBook,
} from "./book_controller";
import { createBook, updateBook } from "./book_validation";

const router = Router();

router.post("/create-book", validateRequest(createBook), createSingleBook);

router.get("/", getAllBooks);

router.get("/:id", getSingleBook);

router.patch(
  "/:id",
  roleAuth(["ADMIN"]),
  validateRequest(updateBook),
  updateSingleBook
);

router.delete("/:id", roleAuth(["ADMIN"]), deleteSingleBook);

export const bookRoutes = router;
