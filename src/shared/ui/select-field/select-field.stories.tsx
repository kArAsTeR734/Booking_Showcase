import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useArgs } from 'storybook/preview-api';
import { fn } from 'storybook/test';
import { SelectField } from './select-field';
const options = [
  { value: 'available', label: 'Сначала доступные' },
  { value: 'price-asc', label: 'По возрастанию цены' },
  { value: 'price-desc', label: 'По убыванию цены' },
];

const meta = {
  title: 'Shared UI/SelectField',
  component: SelectField,
  args: { label: 'Сортировка', options, value: 'available', onValueChange: fn() },
  render: function Render(args) {
    const [, updateArgs] = useArgs();

    return (
      <div style={{ width: 260 }}>
        <SelectField
          {...args}
          onValueChange={(value) => {
            updateArgs({ value });
            args.onValueChange(value);
          }}
        />
      </div>
    );
  },
} satisfies Meta<typeof SelectField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const AlternativeSelection: Story = { args: { value: 'price-asc' } };
export const DisabledOption: Story = {
  args: { options: [...options.slice(0, 2), { ...options[2], disabled: true }] },
};
