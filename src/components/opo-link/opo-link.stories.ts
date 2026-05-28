import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";

const meta: Meta = {
  title: "Components/Atoms/Link",
  component: "opo-link",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      page: null,
      description: {
        component:
          "Link semántico del Design System OPO. Renderiza un enlace nativo cuando existe href y un estado no navegable cuando está disabled o no tiene href.",
      },
    },
  },
  argTypes: {
    href: {
      control: "text",
      description: "URL de destino del enlace.",
      table: { defaultValue: { summary: "undefined" } },
    },
    variant: {
      control: "select",
      options: ["primary", "secondary"],
      description: "Estilo visual del enlace.",
      table: { defaultValue: { summary: "primary" } },
    },
    underline: {
      control: "select",
      options: ["default", "none", "reveal"],
      description:
        "Comportamiento del subrayado: subrayado nativo, sin subrayado o subrayado animado tipo reveal.",
      table: { defaultValue: { summary: "default" } },
    },
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description:
        "Orientación del contenido del enlace. Permite composiciones horizontales o verticales.",
      table: { defaultValue: { summary: "horizontal" } },
    },
    disabled: {
      control: "boolean",
      description:
        "Deshabilita la navegación y renderiza un elemento no interactivo.",
      table: { defaultValue: { summary: "false" } },
    },
    staticColor: {
      control: "select",
      options: [undefined, "white", "black"],
      description:
        "Color estático para usar sobre fondos fijos claros u oscuros.",
      table: { defaultValue: { summary: "undefined" } },
    },
    target: {
      control: "select",
      options: [undefined, "_blank", "_self", "_parent", "_top"],
      description: "Dónde abrir el documento enlazado.",
      table: { defaultValue: { summary: "undefined" } },
    },
    rel: {
      control: "text",
      description:
        "Relación entre el documento actual y el destino. Se calcula automáticamente como noopener noreferrer cuando target es _blank y no se proporciona rel.",
      table: { defaultValue: { summary: "undefined" } },
    },
    download: {
      control: "text",
      description:
        "Indica al navegador que descargue el recurso enlazado. Puede usarse como boolean o nombre de archivo.",
      table: { defaultValue: { summary: "undefined" } },
    },
    referrerPolicy: {
      control: "select",
      options: [
        undefined,
        "no-referrer",
        "no-referrer-when-downgrade",
        "origin",
        "origin-when-cross-origin",
        "same-origin",
        "strict-origin",
        "strict-origin-when-cross-origin",
        "unsafe-url",
      ],
      description: "Política de referrer para la navegación.",
      table: { defaultValue: { summary: "undefined" } },
    },
    ariaLabel: {
      control: "text",
      description:
        "Etiqueta accesible cuando el texto visible no es suficientemente descriptivo.",
      table: { defaultValue: { summary: "undefined" } },
    },
  },
};

export default meta;

type LinkArgs = {
  href?: string;
  variant?: "primary" | "secondary";
  underline?: "default" | "none" | "reveal";
  orientation?: "horizontal" | "vertical";
  disabled?: boolean;
  staticColor?: "white" | "black";
  target?: "_blank" | "_self" | "_parent" | "_top";
  rel?: string;
  download?: boolean | string;
  referrerPolicy?:
    | "no-referrer"
    | "no-referrer-when-downgrade"
    | "origin"
    | "origin-when-cross-origin"
    | "same-origin"
    | "strict-origin"
    | "strict-origin-when-cross-origin"
    | "unsafe-url";
  ariaLabel?: string;
};

function renderLink(args: LinkArgs, label = "Ver más") {
  return html`
    <opo-link
      href=${ifDefined(args.href)}
      variant=${args.variant ?? "primary"}
      underline=${args.underline ?? "default"}
      orientation=${args.orientation ?? "horizontal"}
      static-color=${ifDefined(args.staticColor)}
      target=${ifDefined(args.target)}
      rel=${ifDefined(args.rel)}
      referrer-policy=${ifDefined(args.referrerPolicy)}
      aria-label=${ifDefined(args.ariaLabel)}
      download=${ifDefined(
        typeof args.download === "string" ? args.download : undefined,
      )}
      ?download=${args.download === true}
      ?disabled=${args.disabled}
    >
      ${label}
    </opo-link>
  `;
}

// ==================== VARIANTS ====================

export const Primary: StoryObj<LinkArgs> = {
  args: {
    href: "/",
    variant: "primary",
  },
  render: (args) => renderLink(args, "Enlace principal"),
};

export const Secondary: StoryObj<LinkArgs> = {
  args: {
    href: "/",
    variant: "secondary",
  },
  render: (args) => renderLink(args, "Enlace secundario"),
};

// ==================== UNDERLINE ====================

export const UnderlineDefault: StoryObj<LinkArgs> = {
  args: {
    href: "/",
    underline: "default",
  },
  render: (args) => renderLink(args, "Subrayado por defecto"),
};

export const UnderlineNone: StoryObj<LinkArgs> = {
  args: {
    href: "/",
    underline: "none",
  },
  render: (args) => renderLink(args, "Sin subrayado"),
};

export const UnderlineReveal: StoryObj<LinkArgs> = {
  args: {
    href: "/",
    underline: "reveal",
  },
  render: (args) => renderLink(args, "Subrayado reveal"),
};

export const UnderlineRevealOnDark: StoryObj<LinkArgs> = {
  args: {
    href: "/",
    underline: "reveal",
    staticColor: "white",
  },
  render: (args) => html`
    <div
      style="
        background: #383641;
        padding: 24px;
        border-radius: 8px;
      "
    >
      ${renderLink(args, "Subrayado reveal sobre fondo oscuro")}
    </div>
  `,
};

// ==================== COMPOSITION ====================

export const WithStartIcon: StoryObj<LinkArgs> = {
  args: {
    href: "/",
    variant: "primary",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Example using the icon-start slot to compose the link with opo-icon.",
      },
    },
  },
  render: (args) => html`
    <opo-link
      href=${ifDefined(args.href)}
      variant=${args.variant ?? "primary"}
      underline=${args.underline ?? "default"}
      orientation=${args.orientation ?? "horizontal"}
      ?disabled=${args.disabled}
    >
      <opo-icon slot="icon-start" name="external-link" size="sm"></opo-icon>
      Enlace con icono inicial
    </opo-link>
  `,
};

export const WithEndIcon: StoryObj<LinkArgs> = {
  args: {
    href: "/",
    variant: "primary",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Example using the icon-end slot to place an icon after the link label.",
      },
    },
  },
  render: (args) => html`
    <opo-link
      href=${ifDefined(args.href)}
      variant=${args.variant ?? "primary"}
      underline=${args.underline ?? "default"}
      orientation=${args.orientation ?? "horizontal"}
      ?disabled=${args.disabled}
    >
      Ver documentación
      <opo-icon slot="icon-end" name="arrow-right" size="sm"></opo-icon>
    </opo-link>
  `,
};

export const WithIcons: StoryObj<LinkArgs> = {
  args: {
    href: "/",
    variant: "secondary",
    underline: "none",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Example using both icon slots in an underline-free navigation-like link.",
      },
    },
  },
  render: (args) => html`
    <opo-link
      href=${ifDefined(args.href)}
      variant=${args.variant ?? "secondary"}
      underline=${args.underline ?? "default"}
      orientation=${args.orientation ?? "horizontal"}
      ?disabled=${args.disabled}
    >
      <opo-icon slot="icon-start" name="chevron-left" size="sm"></opo-icon>
      Inicio
      <opo-icon slot="icon-end" name="chevron-right" size="sm"></opo-icon>
    </opo-link>
  `,
};

export const StaticWhite: StoryObj<LinkArgs> = {
  args: {
    href: "/",
    staticColor: "white",
  },
  render: (args) => html`
    <div
      style="
        background: #383641;
        padding: 24px;
        border-radius: 8px;
      "
    >
      ${renderLink(args, "Enlace sobre fondo oscuro")}
    </div>
  `,
};

export const StaticBlack: StoryObj<LinkArgs> = {
  args: {
    href: "/",
    staticColor: "black",
  },
  render: (args) => html`
    <div
      style="
        background: #fff7ee;
        padding: 24px;
        border-radius: 8px;
      "
    >
      ${renderLink(args, "Enlace sobre fondo claro")}
    </div>
  `,
};

export const VerticalOrientation: StoryObj<LinkArgs> = {
  args: {
    href: "/",
    orientation: "vertical",
    underline: "none",
    staticColor: "white",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Example of a vertically stacked navigation link using an icon above the label.",
      },
    },
  },
  render: (args) => html`
    <div
      style="
        background: #383641;
        padding: 24px;
        border-radius: 12px;
      "
    >
      <opo-link
        href=${ifDefined(args.href)}
        variant=${args.variant ?? "primary"}
        underline=${args.underline ?? "none"}
        orientation=${args.orientation ?? "vertical"}
        static-color=${ifDefined(args.staticColor)}
      >
        <opo-icon slot="icon-start" name="shop" size="lg"></opo-icon>
        Carrito
      </opo-link>
    </div>
  `,
};

// ==================== STATES ====================

export const Disabled: StoryObj<LinkArgs> = {
  args: {
    href: "/",
    disabled: true,
  },
  render: (args) => renderLink(args, "Enlace deshabilitado"),
};

export const WithoutHref: StoryObj<LinkArgs> = {
  args: {
    href: undefined,
  },
  render: (args) => html`
    <opo-link
      variant=${args.variant ?? "primary"}
      underline=${args.underline ?? "default"}
      orientation=${args.orientation ?? "horizontal"}
      ?disabled=${args.disabled}
    >
      Enlace sin href
    </opo-link>
  `,
};

// ==================== BEHAVIOR ====================

export const External: StoryObj<LinkArgs> = {
  args: {
    href: "https://example.com",
    target: "_blank",
  },
  render: (args) => renderLink(args, "Abrir enlace externo"),
};

export const Download: StoryObj<LinkArgs> = {
  args: {
    href: "/example.pdf",
    download: "example.pdf",
  },
  render: (args) => renderLink(args, "Descargar archivo"),
};

// ==================== INLINE USAGE ====================

export const InlineWithText: StoryObj<LinkArgs> = {
  args: {
    href: "/",
    variant: "primary",
  },
  render: (args) => html`
    <p style="max-width: 520px; line-height: 1.5;">
      Puedes consultar más información en
      ${renderLink(args, "la documentación del sistema")} antes de continuar con
      el proceso.
    </p>
  `,
};
