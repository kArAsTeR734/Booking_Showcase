import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { BookingHistoryCard } from './booking-history-card';

const meta = {
  title: 'Entities/Booking/BookingHistoryCard',
  component: BookingHistoryCard,
  args: {
    number: 'NR-4821',
    status: 'Подтверждено',
    details: '14–17 сентября · 3 позиции',
    total: '11 440 ₽',
    href: '#booking',
  },
  render: (args) => (
    <div style={{ width: 390, maxWidth: '100%' }}>
      <BookingHistoryCard {...args} />
    </div>
  ),
} satisfies Meta<typeof BookingHistoryCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Confirmed: Story = {};
