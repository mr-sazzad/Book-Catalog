"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const zod_1 = require("zod");
exports.createUser = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: "Name Is Required Filed" }),
        email: zod_1.z.string({ required_error: "Email Is Required Filed" }),
        password: zod_1.z.string({ required_error: "Password Is Required Filed" }),
        role: zod_1.z.enum(["ADMIN", "CUSTOMER"], {
            required_error: "Role Is Required Filed",
        }),
        contactNo: zod_1.z.string({ required_error: "ContactNo Is Required Filed" }),
        address: zod_1.z.string({ required_error: "Address Is Required Filed" }),
        profileImg: zod_1.z.string({ required_error: "Profile Image Is Required Filed" }),
    }),
});
