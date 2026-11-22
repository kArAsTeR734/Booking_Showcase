import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useArgs } from 'storybook/preview-api';
import { fn } from 'storybook/test';
import { QuantityStepper } from './quantity-stepper';
const meta = {
  title: 'Shared UI/QuantityStepper',
  component: QuantityStepper,
  args: { value: 2, min: 1, max: 5, onValueChange: fn() },
  render: function Render(args) {
    const [, updateArgs] = useArgs();

    return (
      <QuantityStepper
        {...args}
        onValueChange={(value) => {
          updateArgs({ value });
          args.onValueChange(value);
        }}
      />
    );
  },
} satisfies Meta<typeof QuantityStepper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Minimum: Story = { args: { value: 1 } };
export const Maximum: Story = { args: { value: 5 } };
