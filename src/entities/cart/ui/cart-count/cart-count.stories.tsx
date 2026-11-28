import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { CartCount } from './cart-count';

const meta = {
  title: 'Entities/Cart/CartCount',
  component: CartCount,
} satisfies Meta<typeof CartCount>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Desktop: Story = {};
export const Compact: Story = { args: { compact: true } };
