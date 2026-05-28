import { createSvgoConfig } from "./svgo.config.base.js";

export default createSvgoConfig({
  presetOverrides: {
    // UI icons should normally be simple and monochrome, but keeping IDs safe
    // avoids breaking any valid icon that uses clipPath/mask internally.
    cleanupIds: false,
  },
});
