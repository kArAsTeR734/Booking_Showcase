import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { RouteTransitionProvider } from '@/shared/routing';
import { CatalogPeriod } from './catalog-period';

const meta = {
  title: 'Features/CatalogPeriod',
  component: CatalogPeriod,
  parameters: { nextjs: { appDirectory: true } },
  decorators: [
    (Story) => (
      <RouteTransitionProvider>
        <Story />
      </RouteTransitionProvider>
    ),
  ],
  args: {
    params: { dates: { start: '2026-09-14', end: '2026-09-17' }, page: 1 },
  },
} satisfies Meta<typeof CatalogPeriod>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InContent: Story = {};
export const InHeader: Story = { args: { header: true } };
