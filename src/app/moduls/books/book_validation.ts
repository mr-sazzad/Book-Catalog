import z from "zod";

export const createBook = z.object({
  body: z.object({
    title: z.string({ required_error: "Title Is Required Filed" }),
    author: z.string({ required_error: "Author Is Required Filed" }),
    price: z.number({ required_error: "Price Is Required Filed" }),
    genre: z.string({ required_error: "Genre Is Required Filed" }),
    publicationDate: z.string({
      required_error: "Publication Date is Required Filed",
    }),
    categoryId: z.string({ required_error: "Category Id Filed Is Required" }),
  }),
});

export const updateBook = z.object({
  body: z.object({
    title: z.string().optional(),
    author: z.string().optional(),
    price: z.number().optional(),
    genre: z.string().optional(),
    publicationDate: z.string().optional(),
    categoryId: z.string().optional(),
  }),
});
