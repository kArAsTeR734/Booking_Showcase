import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { TentTree } from 'lucide-react';
import { useArgs } from 'storybook/preview-api';
import { fn } from 'storybook/test';
import { FilterChip } from './filter-chip';
const meta = {
  title: 'Shared UI/FilterChip',
  component: FilterChip,
  args: { active: true, children: 'Палатки', onClick: fn() },
  render: function Render(args) {
    const [, updateArgs] = useArgs();

    return (
      <FilterChip
        {...args}
        icon={<TentTree aria-hidden />}
        onClick={(event) => {
          updateArgs({ active: !args.active });
          args.onClick?.(event);
        }}
      />
    );
  },
} satisfies Meta<typeof FilterChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Active: Story = {};
export const Inactive: Story = { args: { active: false } };
export const Disabled: Story = { args: { disabled: true } };
