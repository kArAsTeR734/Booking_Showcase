import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ProductCardSkeleton } from './product-card-skeleton';

const meta = {
  title: 'Entities/Product/ProductCardSkeleton',
  component: ProductCardSkeleton,
  render: () => (
    <div style={{ width: 310, maxWidth: '100%' }}>
      <ProductCardSkeleton />
    </div>
  ),
} satisfies Meta<typeof ProductCardSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Loading: Story = {};
