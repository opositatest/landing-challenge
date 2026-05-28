/** @type {import('stylelint').Config} */
module.exports = {
  extends: ["stylelint-config-standard"],
  plugins: ["stylelint-order", "stylelint-value-no-unknown-custom-properties"],

  rules: {
    "order/properties-order": [
      [
        {
          groupName: "custom-properties",
          emptyLineBefore: "never",
          properties: ["/^--/"],
        },

        {
          groupName: "content",
          emptyLineBefore: "never",
          properties: ["content", "quotes"],
        },

        {
          groupName: "positioning",
          emptyLineBefore: "never",
          properties: [
            "position",
            "inset",
            "inset-block",
            "inset-block-start",
            "inset-block-end",
            "inset-inline",
            "inset-inline-start",
            "inset-inline-end",
            "top",
            "right",
            "bottom",
            "left",
            "z-index",
          ],
        },

        {
          groupName: "layout",
          emptyLineBefore: "never",
          properties: [
            "box-sizing",
            "display",

            "flex",
            "flex-basis",
            "flex-direction",
            "flex-flow",
            "flex-grow",
            "flex-shrink",
            "flex-wrap",

            "grid",
            "grid-area",
            "grid-template",
            "grid-template-areas",
            "grid-template-columns",
            "grid-template-rows",
            "grid-auto-columns",
            "grid-auto-flow",
            "grid-auto-rows",
            "grid-column",
            "grid-column-start",
            "grid-column-end",
            "grid-row",
            "grid-row-start",
            "grid-row-end",

            "align-content",
            "align-items",
            "align-self",
            "justify-content",
            "justify-items",
            "justify-self",
            "place-content",
            "place-items",
            "place-self",

            "gap",
            "row-gap",
            "column-gap",

            "order",
          ],
        },

        {
          groupName: "sizing",
          emptyLineBefore: "never",
          properties: [
            "inline-size",
            "min-inline-size",
            "max-inline-size",
            "block-size",
            "min-block-size",
            "max-block-size",

            "width",
            "min-width",
            "max-width",
            "height",
            "min-height",
            "max-height",

            "aspect-ratio",
          ],
        },

        {
          groupName: "spacing",
          emptyLineBefore: "never",
          properties: [
            "margin",
            "margin-block",
            "margin-block-start",
            "margin-block-end",
            "margin-inline",
            "margin-inline-start",
            "margin-inline-end",
            "margin-top",
            "margin-right",
            "margin-bottom",
            "margin-left",

            "padding",
            "padding-block",
            "padding-block-start",
            "padding-block-end",
            "padding-inline",
            "padding-inline-start",
            "padding-inline-end",
            "padding-top",
            "padding-right",
            "padding-bottom",
            "padding-left",
          ],
        },

        {
          groupName: "border",
          emptyLineBefore: "never",
          properties: [
            "border",
            "border-width",
            "border-style",
            "border-color",

            "border-block",
            "border-block-width",
            "border-block-style",
            "border-block-color",
            "border-block-start",
            "border-block-end",

            "border-inline",
            "border-inline-width",
            "border-inline-style",
            "border-inline-color",
            "border-inline-start",
            "border-inline-end",

            "border-top",
            "border-right",
            "border-bottom",
            "border-left",

            "border-radius",
            "border-start-start-radius",
            "border-start-end-radius",
            "border-end-start-radius",
            "border-end-end-radius",
            "border-top-left-radius",
            "border-top-right-radius",
            "border-bottom-right-radius",
            "border-bottom-left-radius",
          ],
        },

        {
          groupName: "background",
          emptyLineBefore: "never",
          properties: [
            "background",
            "background-color",
            "background-image",
            "background-position",
            "background-size",
            "background-repeat",
            "background-origin",
            "background-clip",
            "background-attachment",
          ],
        },

        {
          groupName: "visual-effects",
          emptyLineBefore: "never",
          properties: [
            "box-shadow",
            "opacity",
            "filter",
            "backdrop-filter",
            "mix-blend-mode",
            "isolation",
            "overflow",
            "overflow-x",
            "overflow-y",
            "overflow-block",
            "overflow-inline",
            "clip-path",
            "visibility",
          ],
        },

        {
          groupName: "typography",
          emptyLineBefore: "never",
          properties: [
            "color",

            "font",
            "font-family",
            "font-size",
            "font-style",
            "font-weight",
            "font-variant",
            "font-feature-settings",
            "font-variation-settings",

            "line-height",
            "letter-spacing",

            "text-align",
            "text-decoration",
            "text-decoration-color",
            "text-decoration-line",
            "text-decoration-thickness",
            "text-underline-offset",
            "text-transform",
            "text-indent",
            "text-overflow",
            "text-shadow",
            "text-wrap",
            "white-space",
            "word-break",
            "overflow-wrap",
            "hyphens",

            "vertical-align",

            "text-rendering",
            "-webkit-font-smoothing",
          ],
        },

        {
          groupName: "media",
          emptyLineBefore: "never",
          properties: ["object-fit", "object-position"],
        },

        {
          groupName: "interaction",
          emptyLineBefore: "never",
          properties: [
            "appearance",
            "cursor",
            "pointer-events",
            "user-select",
            "resize",
            "touch-action",
            "accent-color",
            "caret-color",
            "outline",
            "outline-color",
            "outline-style",
            "outline-width",
            "outline-offset",
          ],
        },

        {
          groupName: "svg",
          emptyLineBefore: "never",
          properties: [
            "fill",
            "fill-rule",
            "stroke",
            "stroke-width",
            "stroke-linecap",
            "stroke-linejoin",
            "stroke-dasharray",
            "stroke-dashoffset",
            "vector-effect",
          ],
        },

        {
          groupName: "motion",
          emptyLineBefore: "never",
          properties: [
            "transition",
            "transition-property",
            "transition-duration",
            "transition-timing-function",
            "transition-delay",

            "animation",
            "animation-name",
            "animation-duration",
            "animation-timing-function",
            "animation-delay",
            "animation-iteration-count",
            "animation-direction",
            "animation-fill-mode",
            "animation-play-state",

            "transform",
            "transform-origin",
            "transform-box",
            "translate",
            "rotate",
            "scale",

            "will-change",
          ],
        },
      ],
      {
        unspecified: "bottomAlphabetical",
      },
    ],

    "color-hex-length": "long",

    "csstools/value-no-unknown-custom-properties": [
      true,
      {
        importFrom: [
          "src/stylesheets/tokens/reference.tokens.css",
          "src/stylesheets/tokens/system.tokens.css",
        ],
        severity: "warning",
      },
    ],

    "selector-class-pattern": [
      "^(?:[a-z][a-z0-9]*)(?:-[a-z0-9]+)*(?:(?:__|--)[a-z0-9]+(?:-[a-z0-9]+)*)?$|^(?:is|has)-[a-z0-9]+(?:-[a-z0-9]+)*$",
      {
        message:
          "Expected class selector to follow kebab-case, BEM-style modifiers/elements, or state classes like .is-visible / .has-error",
      },
    ],
  },
};
