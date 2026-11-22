import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { PriceBreakdownRow } from './price-breakdown-row';
const meta = {
  title: 'Shared UI/PriceBreakdownRow',
  component: PriceBreakdownRow,
  args: { label: 'Аренда · 3 дня', value: '4 140 ₽' },
  render: (args) => (
    <dl style={{ width: 300, maxWidth: '100%' }}>
      <PriceBreakdownRow {...args} />
    </dl>
  ),
} satisfies Meta<typeof PriceBreakdownRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
