import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { RentalNavigation } from './rental-navigation';

const common = {
  homeHref: '/',
  links: [{ href: '/', label: 'Каталог', current: 'section' as const }],
  cartHref: '/cart',
  searchHref: '/',
};

describe('RentalNavigation', () => {
  it('composes an indicator without a date control and marks a parent section visually', () => {
    const html = renderToStaticMarkup(
      <RentalNavigation {...common} dateControl={null} cartControl={<span>Корзина · 2</span>} />,
    );
    expect(html).toContain('Корзина · 2');
    expect(html).not.toContain('Период аренды');
    expect(html).toContain('data-active="true"');
    expect(html).not.toContain('aria-current="page"');
  });

  it('renders the default date link and the current page', () => {
    const html = renderToStaticMarkup(
      <RentalNavigation
        {...common}
        links={[{ href: '/', label: 'Каталог', current: 'page' }]}
        dates={{ href: '#period', label: '14–17 сентября' }}
      />,
    );
    expect(html).toContain('href="#period"');
    expect(html).toContain('14–17 сентября');
    expect(html).toContain('aria-current="page"');
  });
});
