import { renderToStaticMarkup } from 'react-dom/server';
import { expect, it } from 'vitest';
import { StatePanel } from './state-panel';

it('allows a route state to use a first-level heading while keeping the default for existing panels', () => {
  const content = { title: 'Товар не найден', icon: <span />, children: 'Вернитесь в каталог.' };
  expect(renderToStaticMarkup(<StatePanel {...content} headingAs="h1" />)).toContain('<h1');
  expect(renderToStaticMarkup(<StatePanel {...content} />)).toContain('<h3');
});
