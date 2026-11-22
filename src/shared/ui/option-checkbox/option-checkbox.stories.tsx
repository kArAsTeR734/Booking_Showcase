import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useArgs } from 'storybook/preview-api';
import { fn } from 'storybook/test';
import { OptionCheckbox } from './option-checkbox';
const meta = {
  title: 'Shared UI/OptionCheckbox',
  component: OptionCheckbox,
  args: {
    title: 'Страховка от повреждений',
    description: '+ 390 ₽ к заказу',
    checked: true,
    onCheckedChange: fn(),
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();

    return (
      <div style={{ width: 310, maxWidth: '100%' }}>
        <OptionCheckbox
          {...args}
          onCheckedChange={(checked) => {
            updateArgs({ checked });
            args.onCheckedChange(checked);
          }}
        />
      </div>
    );
  },
} satisfies Meta<typeof OptionCheckbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Checked: Story = {};
export const Unchecked: Story = { args: { checked: false } };
export const Disabled: Story = { args: { disabled: true } };
