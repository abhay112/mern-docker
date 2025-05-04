// src/models/user.model.ts
import { z } from "zod";

export const UserSchema = z.object({
  user: z.string().min(3),                              // name, string
  interest: z.array(z.string()).min(1),                 // array of strings
  age: z.number().int().min(18),                        // integer age, must be at least 18
  mobile: z.number().int().min(1000000000),              // mobile number, must be a valid long integer
  email: z.string().email()                              // email validation
});

export type User = z.infer<typeof UserSchema> & { _id?: string };
