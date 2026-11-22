import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { RefreshCw, WifiOff } from 'lucide-react';
import { fn } from 'storybook/test';
import { Button } from '../button/button';
import { StatePanel } from './state-panel';
const retry = fn();

const meta = {
  title: 'Shared UI/StatePanel',
  component: StatePanel,
  args: {
    title: 'Нет соединения',
    children: 'Мы сохранили корзину. Проверьте сеть и повторите действие.',
    icon: <WifiOff />,
  },
} satisfies Meta<typeof StatePanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithRetry: Story = {
  args: {
    action: (
      <Button variant="outline" onClick={retry}>
        <RefreshCw aria-hidden />
        Повторить
      </Button>
    ),
  },
};
