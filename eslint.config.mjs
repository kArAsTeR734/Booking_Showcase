import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier/flat';

export default defineConfig([
  ...nextVitals,
  ...nextTypescript,
  prettier,
  {
    files: ['{app,src}/**/*.tsx'],
    ignores: ['src/shared/ui/button/button.tsx'],
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector: "JSXOpeningElement[name.type='JSXIdentifier'][name.name='button']",
          message: 'Используйте Button из @/shared/ui.',
        },
      ],
    },
  },
  globalIgnores(['.next/**', 'out/**', 'coverage/**', 'storybook-static/**', 'next-env.d.ts']),
]);
