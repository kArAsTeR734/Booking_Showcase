import fsd from '@feature-sliced/steiger-plugin';
import { defineConfig } from 'steiger';

export default defineConfig([
  ...fsd.configs.recommended,
  {
    // Общие маршруты хранятся в shared/const по соглашению проекта.
    files: ['./src/shared/const/**'],
    rules: { 'fsd/segments-by-purpose': 'off' },
  },
  {
    // Эти компоненты подготовлены для будущих экранов проката.
    files: [
      './src/entities/booking/**',
      './src/entities/catalog/**',
      './src/entities/cart/**',
      './src/entities/product/**',
      './src/entities/user/**',
      './src/widgets/navigation/**',
    ],
    rules: { 'fsd/insignificant-slice': 'off' },
  },
  {
    // Вход выделен в отдельное действие. Пока его подключает только экран /auth.
    files: ['./src/features/sign-in/**'],
    rules: { 'fsd/insignificant-slice': 'off' },
  },
  {
    // Действия представлены в нескольких блоках одного экрана, а панель объединяет два действия.
    files: [
      './src/features/filter-catalog/**',
      './src/features/select-catalog-period/**',
      './src/features/sort-catalog/**',
      './src/widgets/catalog-controls/**',
    ],
    rules: { 'fsd/insignificant-slice': 'off' },
  },
  {
    // Выдача выделена в самостоятельный блок каталога и используется на маршруте /.
    files: ['./src/widgets/catalog-results/**'],
    rules: { 'fsd/insignificant-slice': 'off' },
  },
  {
    // Самостоятельные действия карточки выделены в отдельные слайсы по спецификации.
    files: ['./src/features/add-to-cart/**', './src/features/share-product/**'],
    rules: { 'fsd/insignificant-slice': 'off' },
  },
]);
