import { z } from "zod";

export const taskSchema = z.object({
  question: z.string().min(1),
  script: z.string(),
});
