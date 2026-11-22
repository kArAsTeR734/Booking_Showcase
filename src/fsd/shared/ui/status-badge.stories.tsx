import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { StatusBadge } from './feedback';

const meta = {
  title: 'Shared UI/StatusBadge',
  component: StatusBadge,
  args: { children: 'Подтверждено' },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['success', 'available'],
    },
  },
} satisfies Meta<typeof StatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Confirmed: Story = { args: { variant: 'success' } };
export const Available: Story = { args: { variant: 'available', children: 'Доступно' } };
