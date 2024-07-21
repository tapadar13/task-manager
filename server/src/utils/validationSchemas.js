import { z } from "zod";

export const userRegistrationSchema = z.object({
  username: z.string().min(3).max(30),
  email: z.string().email(),
  password: z.string().min(6).optional(),
});

export const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const taskSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().optional(),
  column: z.enum(["todo", "in_progress", "done"]),
  order: z.number().int().positive(),
});
