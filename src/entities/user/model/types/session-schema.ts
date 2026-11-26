import { z } from 'zod';

export const sessionSchema = z.object({
  token: z.string().min(1),
  user: z.object({ id: z.string().min(1), name: z.string(), surname: z.string() }),
});
