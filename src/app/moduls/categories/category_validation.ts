import { z } from "zod";

const create = z.object({
  body: z.object({
    title: z.string({ required_error: "Title Is Required Filed" }),
  }),
});

export default create;
