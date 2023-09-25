import { z } from "zod";

export const createUser = z.object({
  body: z.object({
    name: z.string({ required_error: "Name Is Required Filed" }),
    email: z.string({ required_error: "Email Is Required Filed" }),
    password: z.string({ required_error: "Password Is Required Filed" }),
    role: z.enum(["ADMIN", "CUSTOMER"], {
      required_error: "Role Is Required Filed",
    }),
    contactNo: z.string({ required_error: "ContactNo Is Required Filed" }),
    address: z.string({ required_error: "Address Is Required Filed" }),
    profileImg: z.string({ required_error: "Profile Image Is Required Filed" }),
  }),
});
