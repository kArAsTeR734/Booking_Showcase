import type { Preview } from '@storybook/nextjs-vite';
import '@fontsource-variable/archivo';
import '@fontsource-variable/source-sans-3';
import '../src/fsd/app/styles/globals.css';

const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    nextjs: { appDirectory: true },
  },
};

export default preview;
