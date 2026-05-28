import type { StorybookConfig } from "@storybook/web-components-vite";
import path from "node:path";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: ["@storybook/addon-docs", "@storybook/addon-a11y"],
  framework: {
    name: "@storybook/web-components-vite",
    options: {},
  },
  staticDirs: [
    { from: "./public", to: "/" },
    { from: "../public/icons", to: "/icons" },
  ],

  // Force a full Storybook reload when Stencil component source files change.
  //
  // Stencil recompiles component styles correctly, but Storybook/Vite may keep
  // cached loader/dist modules and previously registered custom elements alive.
  // As a result, updated shadow DOM styles are not always reflected automatically
  // during development.
  //
  // To improve the DX when working with Web Components + Shadow DOM, we:
  // 1. invalidate cached loader/dist modules,
  // 2. then trigger a full Storybook reload.
  viteFinal: async (config) => {
    config.plugins = [
      ...(config.plugins ?? []),
      {
        name: "stencil-components-full-reload",
        handleHotUpdate({ file, server }) {
          const componentsDir = path.resolve(process.cwd(), "src/components");
          const isStencilComponentFile =
            file.startsWith(componentsDir) &&
            (file.endsWith(".tsx") || file.endsWith(".css"));

          if (!isStencilComponentFile) {
            return;
          }

          const modulesToInvalidate = [
            ...server.moduleGraph.idToModuleMap.values(),
          ].filter(
            (module) =>
              module.file?.includes("/loader/") ||
              module.file?.includes("/dist/"),
          );

          modulesToInvalidate.forEach((module) => {
            server.moduleGraph.invalidateModule(module);
          });

          setTimeout(() => {
            server.ws.send({ type: "full-reload" });
          }, 1000);
        },
      },
    ];

    return config;
  },
};

export default config;
