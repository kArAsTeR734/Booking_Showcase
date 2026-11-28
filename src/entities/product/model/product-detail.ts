import { z } from 'zod';

export const productDetailSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  category: z.enum(['tents', 'sup', 'gear']),
  details: z.string(),
  dailyRate: z.number().nonnegative(),
  deposit: z.number().nonnegative(),
  available: z.boolean(),
  imageSrc: z.string().min(1),
  characteristics: z.array(z.object({ label: z.string().min(1), value: z.string().min(1) })),
  pickupAddress: z.string().min(1),
});
export type ProductDetail = z.infer<typeof productDetailSchema>;
