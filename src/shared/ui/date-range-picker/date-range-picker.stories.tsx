import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useArgs } from 'storybook/preview-api';
import { fn } from 'storybook/test';
import { DateRangePicker } from './date-range-picker';
const meta = {
  title: 'Shared UI/DateRangePicker',
  component: DateRangePicker,
  args: {
    value: { start: '2026-09-14', end: '2026-09-17' },
    onValueChange: fn(),
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();

    return (
      <div style={{ width: 360, maxWidth: '100%' }}>
        <DateRangePicker
          {...args}
          onValueChange={(value) => {
            updateArgs({ value });
            args.onValueChange(value);
          }}
        />
      </div>
    );
  },
} satisfies Meta<typeof DateRangePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Selected: Story = {};
export const Empty: Story = { args: { value: null } };
export const Catalog: Story = {
  args: {
    desktopSummary: '14 сен, 10:00 → 17 сен, 18:00',
    shortSummary: '14–17 сентября',
    duration: '3 дня',
    allowSameDay: false,
  },
};
