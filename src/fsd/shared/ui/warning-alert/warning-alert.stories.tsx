import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { WarningAlert } from './warning-alert';
const meta = {
  title: 'Shared UI/WarningAlert',
  component: WarningAlert,
  args: {
    title: 'Даты были скорректированы',
    children: 'Выбрана ближайшая доступная дата: 14 сентября.',
  },
} satisfies Meta<typeof WarningAlert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Announced: Story = { args: { announce: true } };
