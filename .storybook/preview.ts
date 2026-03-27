import type { Preview } from '@storybook/web-components-vite';

import '../src/global/global.css';
import '../src/foundations/foundations.css';
import '../src/index.ts';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
      },
    },
    layout: 'centered',
  },
};

export default preview;
