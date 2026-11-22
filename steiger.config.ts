import fsd from '@feature-sliced/steiger-plugin';
import { defineConfig } from 'steiger';

export default defineConfig([
  ...fsd.configs.recommended,
  {
    // Эти компоненты подготовлены для будущих экранов проката.
    files: [
      './src/fsd/entities/booking/**',
      './src/fsd/entities/cart/**',
      './src/fsd/entities/product/**',
      './src/fsd/widgets/navigation/**',
    ],
    rules: { 'fsd/insignificant-slice': 'off' },
  },
]);
