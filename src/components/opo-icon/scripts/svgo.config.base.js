const safeSharedPlugins = [
  // removeDimensions does not break visual identity,
  // it only removes width/height from the root to allow scaling via CSS.
  { name: "removeDimensions" },

  {
    name: "removeAttrs",
    params: {
      // Keep `id` attributes because SVG features such as masks, clipPaths,
      // gradients and filters depend on internal url(#id) references.
      attrs: ["data-name", "data-testid", "aria-hidden"],
    },
  },

  { name: "removeScripts" },
  { name: "removeComments" },
  { name: "sortAttrs" },

  {
    name: "convertPathData",
    params: { floatPrecision: 3 },
  },
];

const uiOnlyPlugins = [
  { name: "removeStyleElement" },
  { name: "removeUselessDefs" },
];

export function createSvgoConfig({
  presetOverrides,
  preserveBrandIdentity = false,
} = {}) {
  return {
    multipass: true,
    plugins: [
      {
        name: "preset-default",
        ...(presetOverrides ? { params: { overrides: presetOverrides } } : {}),
      },
      ...safeSharedPlugins,
      ...(preserveBrandIdentity ? [] : uiOnlyPlugins),
    ],
  };
}
