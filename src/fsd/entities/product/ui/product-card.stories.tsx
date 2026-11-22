import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ProductCard } from './product-card';

const meta = {
  title: 'Entities/Product/ProductCard',
  component: ProductCard,
  args: {
    name: 'Рюкзак Север 45',
    category: 'Треккинг · 45 л',
    details: '1.4 кг · спинка AirFlow · чехол от дождя',
    imageSrc: '/images/rental-equipment.png',
    imageAlt: 'Туристическое снаряжение проката',
    rate: '690 ₽ / день',
    deposit: 'залог 3 000 ₽',
    href: '#product',
  },
  render: (args) => (
    <div style={{ width: 310, maxWidth: '100%' }}>
      <ProductCard {...args} />
    </div>
  ),
} satisfies Meta<typeof ProductCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Available: Story = { args: { availability: 'Доступно' } };
export const WithoutAvailabilityBadge: Story = {};
