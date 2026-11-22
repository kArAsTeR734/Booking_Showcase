import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { CalendarCheck, ShoppingBag } from 'lucide-react';
import NextLink from 'next/link';
import { fn } from 'storybook/test';
import { Button } from './button';

const meta = {
  title: 'Shared UI/Button',
  component: Button,
  args: {
    children: 'Проверить даты',
    onClick: fn(),
  },
  argTypes: {
    asChild: { control: false },
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'outline', 'ghost', 'destructive', 'link'],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
export const Secondary: Story = { args: { variant: 'secondary', children: 'В корзину' } };
export const Outline: Story = { args: { variant: 'outline', children: 'Фильтры' } };
export const Ghost: Story = { args: { variant: 'ghost', children: 'Назад' } };
export const Destructive: Story = { args: { variant: 'destructive', children: 'Удалить' } };
export const Link: Story = { args: { variant: 'link', children: 'Подробнее' } };
export const Disabled: Story = { args: { disabled: true } };

export const WithIcon: Story = {
  render: ({ children, ...args }) => (
    <Button {...args}>
      <CalendarCheck aria-hidden />
      {children}
    </Button>
  ),
};

export const IconOnly: Story = {
  args: { 'aria-label': 'Корзина', size: 'icon', variant: 'secondary' },
  render: (args) => (
    <Button {...args}>
      <ShoppingBag aria-hidden />
    </Button>
  ),
};

export const AsLink: Story = {
  args: { variant: 'outline', children: 'К каталогу' },
  render: ({ children, ...args }) => (
    <Button {...args} asChild>
      <NextLink href="/">{children}</NextLink>
    </Button>
  ),
};
