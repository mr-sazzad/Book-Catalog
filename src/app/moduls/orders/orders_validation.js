"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const zod_1 = require("zod");
const order = zod_1.z.object({
    bookId: zod_1.z.string({ required_error: "Book ID Is Required Filed" }),
    quantity: zod_1.z.number({ required_error: "Quantity Is Required Filed" }),
});
exports.create = zod_1.z.object({
    body: zod_1.z.object({
        orderedBooks: zod_1.z.array(order, {
            required_error: "OrderedBooks Is Required Filed",
        }),
        status: zod_1.z
            .string({ required_error: "Status Is Required Filed" })
            .default("PENDING"),
    }),
});
