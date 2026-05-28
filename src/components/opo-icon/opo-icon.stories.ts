import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit-html";

type IconManifest = { icons: Array<{ name: string }> };
type Loaded = { iconNames: string[] };

const FALLBACK_ICON = "arrow-right";

async function fetchIconNames(): Promise<string[]> {
  try {
    const res = await fetch("/icons/icons.manifest.json");
    if (!res.ok) {
      console.warn(
        "[opo-icon stories] Could not load icons manifest from /icons/icons.manifest.json",
        `(HTTP ${res.status})`,
      );
      return [FALLBACK_ICON];
    }
    const manifest: IconManifest = await res.json();
    return manifest.icons.map((icon) => icon.name);
  } catch (err) {
    console.warn(
      "[opo-icon stories] Could not load icons manifest from /icons/icons.manifest.json",
      err,
    );
    return [FALLBACK_ICON];
  }
}

// Names used in static story templates. If an icon doesn't exist in the
// current sprite, opo-icon renders nothing — acceptable fallback for dev.
const defaultIcon = FALLBACK_ICON;
const calendarIcon = "calendar";
const successIcon = "check";
const dangerIcon = "info-circle";
const primaryIcon = "settings";
const secondaryIcon = "user";
const warningIcon = "trash-2";
const copyIcon = "copy";
const searchIcon = "search";
const starIcon = "star";
const downloadIcon = "download";
const spinIcon = "refresh-cw";

const meta: Meta = {
  title: "Components/Atoms/Icon",
  component: "opo-icon",
  tags: ["autodocs"],
  loaders: [async () => ({ iconNames: await fetchIconNames() })],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
          **opo-icon** es el componente para renderizar iconos del Design System OPO.
          Soporta iconos del sprite principal y también iconos personalizados mediante slot.
          El soporte de iconos personalizados por slot está pensado para uso simple (contenido estático).
          Si el contenido del slot cambia dinámicamente durante runtime, el comportamiento puede requerir un nuevo render del host.
        `,
      },
    },
  },
  argTypes: {
    name: {
      control: "text",
      description:
        "Nombre del icono en el sprite (requerido si no se usa slot custom)",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Tamaño del icono",
    },
    color: {
      control: "select",
      options: ["primary", "secondary", "danger", "success", "warning"],
      description:
        "Color semántico opcional. Si no se define, el icono hereda currentColor.",
    },
    spriteUrl: {
      control: "text",
      description:
        "URL pública del sprite SVG. Útil cuando la app consumidora sirve los iconos desde otra ruta.",
    },
    ariaLabel: {
      control: "text",
      description:
        "Texto accesible (recomendado cuando el icono tiene significado)",
    },
    spinning: {
      control: "boolean",
      description: "Activa animación de rotación continua",
    },
  },
};

export default meta;

type Story = StoryObj;

// ==================== HISTORIAS PRINCIPALES ====================

export const Default: Story = {
  args: {
    name: defaultIcon,
    size: "md",
  },
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; align-items: center; gap: 24px;">
      <opo-icon name="${calendarIcon}" size="sm"></opo-icon>
      <opo-icon name="${calendarIcon}" size="md"></opo-icon>
      <opo-icon name="${calendarIcon}" size="lg"></opo-icon>
    </div>
  `,
};

export const InheritsColor: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Cuando no se proporciona la propiedad de color, el icono hereda currentColor de su contexto padre.",
      },
    },
  },

  render: () => html`
    <div
      style="
        display: inline-flex;
        align-items: center;
        gap: 8px;
        color: var(--sys-color-text-inverse);
        background: #383641;
        padding: 16px;
      "
    >
      <opo-icon name="${calendarIcon}"></opo-icon>
      <span>El icono hereda currentColor</span>
    </div>
  `,
};

export const Colors: Story = {
  render: () => html`
    <div style="display: flex; align-items: center; gap: 20px;">
      <opo-icon name="${successIcon}" color="success"></opo-icon>
      <opo-icon name="${dangerIcon}" color="danger"></opo-icon>
      <opo-icon name="${primaryIcon}" color="primary"></opo-icon>
      <opo-icon name="${secondaryIcon}" color="secondary"></opo-icon>
      <opo-icon name="${warningIcon}" color="warning"></opo-icon>
    </div>
  `,
};

export const Spinning: Story = {
  args: {
    name: spinIcon,
    size: "lg",
    spinning: true,
  },
};

export const Decorative: Story = {
  args: {
    name: starIcon,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Cuando no se proporciona aria-label, el icono se considera decorativo y se oculta de las tecnologías asistivas.",
      },
    },
  },
};

export const InlineWithText: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Ejemplo de uso inline junto a texto para comprobar alineación vertical y comportamiento tipográfico.",
      },
    },
  },
  render: () => html`
    <p style="font-size: 16px; line-height: 1.5;">
      Descargar <opo-icon name="${downloadIcon}" size="sm"></opo-icon>
    </p>
  `,
};

export const WithAriaLabel: Story = {
  args: {
    name: warningIcon,
    ariaLabel: "Eliminar elemento",
    color: "danger",
  },
};

// ==================== CUSTOM ICON ====================

export const CustomSVG: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Ejemplo de uso de un SVG personalizado mediante slot. Está pensado para casos puntuales o contenido estático que no pertenece al catálogo principal de iconos.",
      },
    },
  },
  render: () => html`
    <opo-icon size="md" aria-label="Icono personalizado">
      <svg
        slot="icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" />
      </svg>
    </opo-icon>
  `,
};

// ==================== USO EN CONTEXTOS ====================

export const InButtons: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Ejemplo de composición dentro de botones. El icono hereda color y contexto accesible del componente interactivo padre.",
      },
    },
  },
  render: () => html`
    <div style="display: flex; gap: 12px;">
      <opo-button variant="primary" size="md">
        <opo-icon name="${calendarIcon}" slot="icon-start"></opo-icon>
        Oposiciones
      </opo-button>

      <opo-button variant="secondary" size="md">
        <opo-icon name="${copyIcon}" slot="icon-start"></opo-icon>
        Esquemas
      </opo-button>

      <opo-button variant="ghost" size="md" icon-only aria-label="Buscar">
        <opo-icon name="${searchIcon}" slot="icon-start"></opo-icon>
      </opo-button>
    </div>
  `,
};

export const AllIcons: Story = {
  render: (_args, context) => {
    const names = (context.loaded as Loaded).iconNames;
    return html`
      <div
        style="display: grid; grid-template-columns: repeat(auto-fill, minmax(90px, 1fr)); gap: 20px; max-width: 900px;"
      >
        ${names.map(
          (name) => html`
            <div style="text-align: center;">
              <opo-icon name="${name}" size="lg"></opo-icon>
              <div
                style="margin-top: 8px; font-size: 13px; color: #383641; word-break: break-word;"
              >
                ${name}
              </div>
            </div>
          `,
        )}
      </div>
    `;
  },
};
