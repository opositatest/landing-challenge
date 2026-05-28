import { beforeAll } from 'vitest';
import { setProjectAnnotations } from '@storybook/web-components';
import * as previewAnnotations from './preview';
import { defineCustomElements } from '../loader';

beforeAll(async () => {
  await defineCustomElements();
});

setProjectAnnotations(previewAnnotations);
