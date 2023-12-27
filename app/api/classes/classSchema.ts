import { z } from "zod";

export const classCreationSchema = z.object({
  name: z.string().min(5),
});
