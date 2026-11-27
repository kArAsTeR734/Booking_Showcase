import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { RouteTransitionProvider } from '@/shared/routing';
import { CatalogSort } from './catalog-sort';

const meta = {
  title: 'Features/CatalogSort',
  component: CatalogSort,
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
} satisfies Meta<typeof CatalogSort>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {};
export const Compact: Story = { args: { compact: true } };
