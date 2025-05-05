// src/models/user.model.ts
import { z } from "zod";

export const UserSchema = z.object({
  user: z.string().min(3),                               // Name
  interest: z.array(z.string()).min(1),                  // Interests
  age: z.number().int().min(0),                          // Age (allowing 0+ as per your update)
  mobile: z
    .number()
    .int()
    .refine(
      (val) => /^[6-9]\d{9}$/.test(val.toString()),
      { message: "Invalid Indian mobile number" }
    ),
  email: z.string().email(),                             // Email
});

export type User = z.infer<typeof UserSchema> & { _id?: string };
