import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { RentalNavigation } from './rental-navigation';

const meta = {
  title: 'Widgets/Navigation/RentalNavigation',
  component: RentalNavigation,
  parameters: { layout: 'padded' },
  args: {
    homeHref: '#home',
    links: [
      { href: '#catalog', label: 'Каталог', current: true },
      { href: '#dates', label: 'Как получить' },
      { href: '#booking', label: 'История' },
    ],
    dates: { href: '#dates', label: '14–17 сен' },
    cartHref: '#cart',
    cartCount: 2,
    searchHref: '#catalog',
  },
} satisfies Meta<typeof RentalNavigation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {};
export const Mobile: Story = { args: { compact: true } };
