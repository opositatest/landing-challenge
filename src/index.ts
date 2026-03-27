// Auto-register every component module so the landing and Storybook can
// consume new custom elements without updating imports one by one.
const componentModules = import.meta.glob(
  [
    './components/**/*.ts',
    '!./components/**/*.stories.ts',
    '!./components/**/*.test.ts',
  ],
  { eager: true },
);

void componentModules;

export {};
