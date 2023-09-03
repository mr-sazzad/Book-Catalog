import { z } from "zod";

const order = z.object({
  bookId: z.string({ required_error: "Book ID Is Required Filed" }),
  quantity: z.number({ required_error: "Quantity Is Required Filed" }),
});

export const create = z.object({
  body: z.object({
    orderedBooks: z.array(order, {
      required_error: "OrderedBooks Is Required Filed",
    }),
    status: z
      .string({ required_error: "Status Is Required Filed" })
      .default("PENDING"),
  }),
});
