import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { QuantityStepper } from '@/shared/ui';
import { CartItem } from './cart-item';

const formatPrice = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  maximumFractionDigits: 0,
});

const meta = {
  title: 'Entities/Cart/CartItem',
  component: CartItem,
  args: {
    name: 'Рюкзак Север 45',
    category: 'Треккинг',
    details: '690 ₽ × 3 дня',
    imageSrc: '/images/rental-equipment.png',
  },
  argTypes: {
    total: { control: false },
    quantityControl: { control: false },
  },
  render: function Render(args) {
    const [quantity, setQuantity] = useState(1);

    return (
      <div style={{ width: 590, maxWidth: '100%' }}>
        <CartItem
          {...args}
          total={formatPrice.format(2070 * quantity)}
          quantityControl={
            <QuantityStepper
              label="Количество рюкзаков"
              min={1}
              max={5}
              value={quantity}
              onValueChange={setQuantity}
            />
          }
        />
      </div>
    );
  },
} satisfies Meta<typeof CartItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithQuantity: Story = {
  args: { total: '2 070 ₽', quantityControl: null },
};
