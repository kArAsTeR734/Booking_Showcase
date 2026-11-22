import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().trim().min(1, 'Введите email.').pipe(z.email('Введите корректный email.')),
  password: z.string().min(1, 'Введите пароль.'),
});
