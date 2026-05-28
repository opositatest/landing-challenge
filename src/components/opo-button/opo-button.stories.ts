import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

const meta: Meta = {
  title: "Components/Atoms/Button",
  component: "opo-button",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      page: null,
      description: {
        component:
          "Botón de acción del Design System OPO. Soporta variantes visuales, tamaños, estado disabled, estado loading, ancho completo e iconos mediante slots.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost", "destructive"],
      description: "Estilo visual del botón.",
      table: { defaultValue: { summary: "primary" } },
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Tamaño visual del botón.",
      table: { defaultValue: { summary: "md" } },
    },
    iconOnly: {
      control: "boolean",
      description: "Renders the button as an icon-only button.",
      table: { defaultValue: { summary: "false" } },
    },
    fullWidth: {
      control: "boolean",
      description: "Hace que el botón ocupe todo el ancho disponible.",
      table: { defaultValue: { summary: "false" } },
    },
    loading: {
      control: "boolean",
      description: "Muestra estado de carga y bloquea la interacción.",
      table: { defaultValue: { summary: "false" } },
    },
    disabled: {
      control: "boolean",
      description: "Deshabilita el botón.",
      table: { defaultValue: { summary: "false" } },
    },
    type: {
      control: "select",
      options: ["button", "submit", "reset"],
      description: "Tipo nativo del botón.",
      table: { defaultValue: { summary: "button" } },
    },
    ariaLabel: {
      control: "text",
      description:
        "Etiqueta accesible. Necesaria cuando el botón no tiene texto visible, por ejemplo en botones icon-only.",
    },
    onClick: {
      action: "click",
      description: "Native click event emitted by the button.",
      table: {
        category: "Events",
      },
    },
  },
};

export default meta;

type ButtonArgs = {
  variant?: "primary" | "secondary" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
  iconOnly?: boolean;
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  ariaLabel?: string;
  onClick?: (event: MouseEvent) => void;
};

function renderButton(args: ButtonArgs, label = "Botón") {
  return html`
    <opo-button
      variant=${args.variant ?? "primary"}
      size=${args.size ?? "md"}
      type=${args.type ?? "button"}
      aria-label=${args.ariaLabel ?? ""}
      ?icon-only=${args.iconOnly}
      ?full-width=${args.fullWidth}
      ?loading=${args.loading}
      ?disabled=${args.disabled}
      @click=${args.onClick}
    >
      ${label}
    </opo-button>
  `;
}

// ==================== VARIANTS ====================

export const Primary: StoryObj<ButtonArgs> = {
  args: { variant: "primary" },
  render: (args) => renderButton(args, "Botón principal"),
};

export const Secondary: StoryObj<ButtonArgs> = {
  args: { variant: "secondary" },
  render: (args) => renderButton(args, "Botón secundario"),
};

export const Ghost: StoryObj<ButtonArgs> = {
  args: { variant: "ghost" },
  render: (args) => renderButton(args, "Botón ghost"),
};

export const Destructive: StoryObj<ButtonArgs> = {
  args: { variant: "destructive" },
  render: (args) => renderButton(args, "Eliminar"),
};

// ==================== SIZES ====================

export const Small: StoryObj<ButtonArgs> = {
  args: { size: "sm" },
  render: (args) => renderButton(args, "Small"),
};

export const Medium: StoryObj<ButtonArgs> = {
  args: { size: "md" },
  render: (args) => renderButton(args, "Medium"),
};

export const Large: StoryObj<ButtonArgs> = {
  args: { size: "lg" },
  render: (args) => renderButton(args, "Large"),
};

// ==================== STATES ====================

export const Loading: StoryObj<ButtonArgs> = {
  args: {
    variant: "primary",
    loading: true,
  },
  render: (args) => html`
    <opo-button
      variant=${args.variant ?? "primary"}
      size=${args.size ?? "md"}
      type=${args.type ?? "button"}
      loading
    >
      Procesando
    </opo-button>
  `,
};

export const Disabled: StoryObj<ButtonArgs> = {
  args: {
    variant: "primary",
    disabled: true,
  },
  render: (args) => html`
    <opo-button
      variant=${args.variant ?? "primary"}
      size=${args.size ?? "md"}
      type=${args.type ?? "button"}
      disabled
    >
      Deshabilitado
    </opo-button>
  `,
};

// ==================== COMPOSITION ====================

export const WithIcons: StoryObj<ButtonArgs> = {
  args: {
    variant: "primary",
    size: "md",
  },
  render: (args) => html`
    <opo-button
      variant=${args.variant ?? "primary"}
      size=${args.size ?? "md"}
      type=${args.type ?? "button"}
      ?loading=${args.loading}
      ?disabled=${args.disabled}
      @click=${args.onClick}
    >
      <opo-icon slot="icon-start" name="search" size="md"></opo-icon>
      Buscar
      <opo-icon slot="icon-end" name="arrow-right" size="md"></opo-icon>
    </opo-button>
  `,
};

export const IconButton: StoryObj<ButtonArgs> = {
  args: {
    variant: "ghost",
    size: "md",
    iconOnly: true,
    ariaLabel: "Buscar",
    fullWidth: false,
  },
  argTypes: {
    fullWidth: {
      control: false,
    },
  },
  render: (args) => html`
    <opo-button
      variant="ghost"
      size=${args.size ?? "md"}
      ?icon-only=${args.iconOnly}
      aria-label=${args.ariaLabel ?? "Buscar"}
      ?loading=${args.loading}
      ?disabled=${args.disabled}
      @click=${args.onClick}
    >
      <opo-icon slot="icon-start" name="search" size="md"></opo-icon>
    </opo-button>
  `,
};

export const CustomLoader: StoryObj<ButtonArgs> = {
  args: {
    variant: "primary",
    loading: true,
  },
  argTypes: {
    onClick: {
      table: {
        disable: true,
      },
    },
  },
  render: (args) => html`
    <opo-button
      variant=${args.variant ?? "primary"}
      size=${args.size ?? "md"}
      type=${args.type ?? "button"}
      loading
    >
      Guardar
      <opo-icon slot="loader" name="refresh-cw" size="md" spinning></opo-icon>
    </opo-button>
  `,
};

// ==================== LAYOUT ====================

export const FullWidth: StoryObj<ButtonArgs> = {
  args: {
    variant: "primary",
    fullWidth: true,
  },
  render: (args) => html`
    <div
      style="width: 500px; border: 1px dashed #afafb3; padding: 16px; display: flex; margin: 0 auto;"
    >
      ${renderButton(args, "Botón de ancho completo")}
    </div>
  `,
};
