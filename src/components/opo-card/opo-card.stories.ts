import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

const meta: Meta = {
  title: "Components/Atoms/Card",
  component: "opo-card",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      page: null,
      description: {
        component:
          "Contenedor composable del Design System OPO. Soporta variantes visuales, tamaños, media, header, content, footer y acciones mediante slots.",
      },
    },
  },
  argTypes: {
    as: {
      control: "select",
      options: ["div", "article", "section"],
      description: "Elemento semántico raíz renderizado por la card.",
      table: { defaultValue: { summary: "div" } },
    },
    variant: {
      control: "select",
      options: ["default", "outlined", "elevated"],
      description: "Estilo visual de la card.",
      table: { defaultValue: { summary: "default" } },
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Densidad interna de espaciado.",
      table: { defaultValue: { summary: "md" } },
    },
    fullWidth: {
      control: "boolean",
      description: "Hace que la card ocupe todo el ancho disponible.",
      table: { defaultValue: { summary: "false" } },
    },
    interactive: {
      control: "boolean",
      description:
        "Añade affordance visual interactiva. No añade semántica de botón o enlace.",
      table: { defaultValue: { summary: "false" } },
    },
  },
};

export default meta;

type CardArgs = {
  as?: "div" | "article" | "section";
  variant?: "default" | "outlined" | "elevated";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  interactive?: boolean;
};

function renderCard(args: CardArgs) {
  return html`
    <opo-card
      as=${args.as ?? "div"}
      variant=${args.variant ?? "default"}
      size=${args.size ?? "md"}
      ?full-width=${args.fullWidth}
      ?interactive=${args.interactive}
    >
      <span slot="eyebrow">Preparación</span>
      <h3 slot="title">Plan de estudio semanal</h3>
      <p slot="description">
        Organiza tus sesiones de estudio, repasos y simulacros desde un único
        espacio.
      </p>

      <p>
        Crea una rutina flexible y visual para avanzar con claridad durante la
        semana.
      </p>

      <opo-button slot="footer" variant="primary" size="md">
        Ver plan
      </opo-button>
    </opo-card>
  `;
}

// ==================== VARIANTS ====================

export const Default: StoryObj<CardArgs> = {
  args: {
    as: "div",
    variant: "default",
    size: "md",
  },
  render: (args) => renderCard(args),
};

export const Outlined: StoryObj<CardArgs> = {
  args: {
    as: "div",
    variant: "outlined",
    size: "md",
  },
  render: (args) => renderCard(args),
};

export const Elevated: StoryObj<CardArgs> = {
  args: {
    as: "div",
    variant: "elevated",
    size: "md",
  },
  render: (args) => renderCard(args),
};

// ==================== SIZES ====================

export const Small: StoryObj<CardArgs> = {
  args: {
    as: "div",
    size: "sm",
  },
  render: (args) => renderCard(args),
};

export const Medium: StoryObj<CardArgs> = {
  args: {
    as: "div",
    size: "md",
  },
  render: (args) => renderCard(args),
};

export const Large: StoryObj<CardArgs> = {
  args: {
    as: "div",
    size: "lg",
  },
  render: (args) => renderCard(args),
};

// ==================== SEMANTIC ROOT ====================

export const AsArticle: StoryObj<CardArgs> = {
  args: {
    as: "article",
    variant: "default",
    size: "md",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Renderiza la card con article cuando representa una pieza de contenido independiente.",
      },
    },
  },
  render: (args) => renderCard(args),
};

export const AsSection: StoryObj<CardArgs> = {
  args: {
    as: "section",
    variant: "outlined",
    size: "md",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Renderiza la card con section cuando agrupa una sección temática dentro de una página.",
      },
    },
  },
  render: (args) => renderCard(args),
};

// ==================== COMPOSITION ====================

export const WithMedia: StoryObj<CardArgs> = {
  args: {
    as: "div",
    variant: "default",
    size: "md",
  },
  render: (args) => html`
    <opo-card
      as=${args.as ?? "div"}
      variant=${args.variant ?? "default"}
      size=${args.size ?? "md"}
      ?full-width=${args.fullWidth}
      ?interactive=${args.interactive}
    >
      <img
        slot="media"
        src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900&auto=format&fit=crop"
        alt=""
      />

      <span slot="eyebrow">Curso</span>
      <h3 slot="title">Diseño de componentes</h3>
      <p slot="description">
        Aprende a estructurar componentes reutilizables con una API clara.
      </p>

      <p>
        Una card puede combinar contenido, media, acciones y metadatos sin
        acoplarse a un layout concreto.
      </p>
    </opo-card>
  `,
};

export const WithAction: StoryObj<CardArgs> = {
  args: {
    as: "div",
    variant: "outlined",
    size: "md",
  },
  render: (args) => html`
    <opo-card
      as=${args.as ?? "div"}
      variant=${args.variant ?? "outlined"}
      size=${args.size ?? "md"}
      ?full-width=${args.fullWidth}
      ?interactive=${args.interactive}
    >
      <span slot="eyebrow">Proyecto</span>
      <h3 slot="title">Biblioteca de componentes</h3>
      <p slot="description">
        Estado general de documentación, accesibilidad y tests.
      </p>

      <opo-button
        slot="action"
        variant="ghost"
        size="md"
        icon-only
        aria-label="Más opciones"
      >
        <opo-icon slot="icon-start" name="settings"></opo-icon>
      </opo-button>

      <p>
        Revisa el estado actual de los componentes y las tareas pendientes del
        sistema.
      </p>
    </opo-card>
  `,
};

export const WithFooter: StoryObj<CardArgs> = {
  args: {
    as: "div",
    variant: "default",
    size: "md",
  },
  render: (args) => html`
    <opo-card
      as=${args.as ?? "div"}
      variant=${args.variant ?? "default"}
      size=${args.size ?? "md"}
      ?full-width=${args.fullWidth}
      ?interactive=${args.interactive}
    >
      <span slot="eyebrow">Recurso</span>
      <h3 slot="title">Guía de accesibilidad</h3>
      <p slot="description">
        Buenas prácticas para interfaces accesibles y mantenibles.
      </p>

      <p>
        Una referencia rápida para revisar roles, foco, nombres accesibles y
        navegación por teclado.
      </p>

      <div slot="footer" style="display: flex; gap: 12px;">
        <opo-button variant="primary" size="md">Leer guía</opo-button>
        <opo-link href="/" variant="secondary">Ver detalles</opo-link>
      </div>
    </opo-card>
  `,
};

// ==================== STATES ====================

export const Interactive: StoryObj<CardArgs> = {
  args: {
    as: "div",
    variant: "default",
    size: "md",
    interactive: true,
  },
  render: (args) => renderCard(args),
};

// ==================== LAYOUT ====================

export const FullWidth: StoryObj<CardArgs> = {
  args: {
    as: "div",
    variant: "default",
    size: "md",
    fullWidth: true,
  },
  render: (args) => html`
    <div
      style="width: 640px; border: 1px dashed #afafb3; padding: 16px; display: flex;"
    >
      ${renderCard(args)}
    </div>
  `,
};
