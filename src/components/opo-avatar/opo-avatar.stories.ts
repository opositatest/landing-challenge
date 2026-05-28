import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";

const meta: Meta = {
  title: "Components/Atoms/Avatar",
  component: "opo-avatar",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      page: null,
      description: {
        component:
          "Avatar circular del Design System OPO. Representa visualmente una persona o entidad mediante imagen, iniciales o icono fallback.",
      },
    },
  },
  argTypes: {
    src: {
      control: "text",
      description: "URL de la imagen del avatar.",
      table: { defaultValue: { summary: "undefined" } },
    },
    alt: {
      control: "text",
      description:
        "Texto alternativo de la imagen. Usa alt vacío cuando el nombre ya esté visible cerca.",
      table: { defaultValue: { summary: '""' } },
    },
    fallback: {
      control: "text",
      description: "Texto fallback, normalmente iniciales.",
      table: { defaultValue: { summary: "undefined" } },
    },
    fallbackIcon: {
      control: "text",
      description:
        "Nombre del icono usado como fallback cuando no hay imagen ni texto fallback.",
      table: { defaultValue: { summary: "user" } },
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Tamaño visual del avatar.",
      table: { defaultValue: { summary: "md" } },
    },
    color: {
      control: "select",
      options: ["neutral", "brand"],
      description: "Tratamiento visual del fallback.",
      table: { defaultValue: { summary: "neutral" } },
    },
  },
};

export default meta;

type AvatarArgs = {
  src?: string;
  alt?: string;
  fallback?: string;
  fallbackIcon?: string;
  size?: "sm" | "md" | "lg";
  color?: "neutral" | "brand";
};

const avatarImage = "https://i.pravatar.cc/160?u=jane-doe";

function renderAvatar(args: AvatarArgs) {
  return html`
    <opo-avatar
      src=${ifDefined(args.src)}
      alt=${args.alt ?? ""}
      fallback=${ifDefined(args.fallback)}
      fallback-icon=${args.fallbackIcon ?? "user"}
      size=${args.size ?? "md"}
      color=${args.color ?? "neutral"}
    ></opo-avatar>
  `;
}

// ==================== BASIC ====================

export const Default: StoryObj<AvatarArgs> = {
  args: {
    src: avatarImage,
    alt: "Jane Doe",
    size: "md",
  },
  render: (args) => renderAvatar(args),
};

export const Image: StoryObj<AvatarArgs> = {
  args: {
    src: avatarImage,
    alt: "Avatar de usuario",
    size: "md",
  },
  render: (args) => renderAvatar(args),
};

// ==================== FALLBACKS ====================

export const WithInitials: StoryObj<AvatarArgs> = {
  args: {
    fallback: "JD",
    size: "md",
    color: "neutral",
  },
  render: (args) => renderAvatar(args),
};

export const WithIconFallback: StoryObj<AvatarArgs> = {
  args: {
    fallbackIcon: "user",
    size: "md",
    color: "neutral",
  },
  render: (args) => renderAvatar(args),
};

export const BrokenImageFallback: StoryObj<AvatarArgs> = {
  args: {
    src: "/missing-avatar.jpg",
    alt: "Usuario",
    fallback: "JD",
    size: "md",
    color: "brand",
  },
  render: (args) => renderAvatar(args),
};

// ==================== SIZES ====================

export const Sizes: StoryObj<AvatarArgs> = {
  render: () => html`
    <div style="display: flex; align-items: center; gap: 16px;">
      <opo-avatar
        src="https://i.pravatar.cc/160?u=jane-doe"
        alt="Jane Doe"
        size="sm"
      ></opo-avatar>

      <opo-avatar
        src="https://i.pravatar.cc/160?u=jane-doe"
        alt="Jane Doe"
        size="md"
      ></opo-avatar>

      <opo-avatar
        src="https://i.pravatar.cc/160?u=jane-doe"
        alt="Jane Doe"
        size="lg"
      ></opo-avatar>
    </div>
  `,
};

// ==================== COLORS ====================

export const Colors: StoryObj<AvatarArgs> = {
  render: () => html`
    <div style="display: flex; align-items: center; gap: 16px;">
      <opo-avatar fallback="JD" color="neutral"></opo-avatar>
      <opo-avatar fallback="JD" color="brand"></opo-avatar>
    </div>
  `,
};

// ==================== COMPOSITION ====================

export const WithText: StoryObj<AvatarArgs> = {
  render: () => html`
    <div style="display: flex; align-items: center; gap: 12px;">
      <opo-avatar src=${avatarImage} alt=""></opo-avatar>

      <div style="display: flex; flex-direction: column; gap: 2px;">
        <strong style="font-size: 16px; line-height: 1.4; color: #1f1f21;">
          Jane Doe
        </strong>
        <span style="font-size: 14px; line-height: 1.4; color: #605e67;">
          UI Engineer
        </span>
      </div>
    </div>
  `,
};

export const InButton: StoryObj<AvatarArgs> = {
  parameters: {
    docs: {
      description: {
        story:
          "Ejemplo de composición dentro de un botón. El avatar no es interactivo por sí mismo; la semántica interactiva pertenece al botón.",
      },
    },
  },
  render: () => html`
    <opo-button variant="ghost" size="md">
      <opo-avatar
        slot="icon-start"
        src=${avatarImage}
        alt=""
        size="sm"
      ></opo-avatar>
      Perfil
    </opo-button>
  `,
};

export const InCard: StoryObj<AvatarArgs> = {
  parameters: {
    docs: {
      description: {
        story:
          "Ejemplo de avatar dentro de una card, combinado con contenido textual.",
      },
    },
  },
  render: () => html`
    <opo-card variant="outlined" size="md">
      <div style="display: flex; align-items: center; gap: 12px;">
        <opo-avatar src=${avatarImage} alt=""></opo-avatar>
        <div style="display: flex; flex-direction: column;">
          <strong>Jane Doe</strong>
          <span>Design Systems · UI Engineering</span>
        </div>
      </div>
    </opo-card>
  `,
};
