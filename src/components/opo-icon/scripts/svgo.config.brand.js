import { createSvgoConfig } from "./svgo.config.base.js";

export default createSvgoConfig({
  presetOverrides: {
    cleanupIds: false,
    removeUselessDefs: false,
    collapseGroups: false,
    mergePaths: false,
    convertShapeToPath: false,
    convertColors: false,
  },
  preserveBrandIdentity: true,
});
