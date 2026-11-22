import fsd from '@feature-sliced/steiger-plugin';
import { defineConfig } from 'steiger';

export default defineConfig([
  ...fsd.configs.recommended,
  {
    // Эти компоненты подготовлены для будущих экранов проката.
    files: [
      './src/entities/booking/**',
      './src/entities/cart/**',
      './src/entities/product/**',
      './src/widgets/navigation/**',
    ],
    rules: { 'fsd/insignificant-slice': 'off' },
  },
  {
    // Вход выделен в отдельное действие. Пока его подключает только экран /auth.
    files: ['./src/features/sign-in/**'],
    rules: { 'fsd/insignificant-slice': 'off' },
  },
]);
