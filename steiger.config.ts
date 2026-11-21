import fsd from '@feature-sliced/steiger-plugin';
import { defineConfig } from 'steiger';

export default defineConfig([
  ...fsd.configs.recommended,
  {
    // Эти компоненты UI-кита пока подключены только к странице-превью.
    files: [
      './src/fsd/entities/booking/**',
      './src/fsd/entities/cart/**',
      './src/fsd/widgets/navigation/**',
    ],
    rules: { 'fsd/insignificant-slice': 'off' },
  },
]);
