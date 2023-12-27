import { z } from "zod";

export const joinSchema = z.object({
  link: z.string().min(1),
  password: z.string().min(1),
});
