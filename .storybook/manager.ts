import { addons } from 'storybook/manager-api';

import '@fontsource/ibm-plex-sans/400.css';
import '@fontsource/ibm-plex-sans/500.css';
import '@fontsource/ibm-plex-sans/600.css';
import '@fontsource/ibm-plex-sans/700.css';

import { theme } from './theme';

addons.setConfig({
  theme,
});

const managerFontFamily = 'IBM Plex Sans, system-ui, sans-serif';

const style = document.createElement('style');
style.textContent = `
  :root,
  body,
  #storybook-root,
  .sidebar-container,
  .sidebar-header,
  .sidebar-subheading,
  .sidebar-item,
  .search-field input,
  .docblock-argstable,
  .simplebar-content {
    font-family: ${managerFontFamily} !important;
  }
`;

document.head.appendChild(style);
