import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Phone } from 'lucide-react';
import { TextField } from './text-field';
const meta = {
  title: 'Shared UI/TextField',
  component: TextField,
  args: {
    id: 'contact-phone',
    type: 'tel',
    autoComplete: 'tel',
    label: 'Контактный телефон',
    placeholder: '+7 900 000-00-00',
    hint: 'Используем только для связи по брони',
  },
  render: (args) => (
    <div style={{ width: 310, maxWidth: '100%' }}>
      <TextField {...args} icon={<Phone size={17} />} />
    </div>
  ),
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Filled: Story = { args: { defaultValue: '+7 900 123-45-67' } };
export const Disabled: Story = { args: { disabled: true } };
