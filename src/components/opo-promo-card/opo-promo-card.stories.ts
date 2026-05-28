import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";

const pendingImage = "/src/assets/demo/promo-card-course.png";
const freeTestsImage = "/src/assets/demo/promo-card-free-tests.png";
const knowledgeTestImage = "/src/assets/demo/promo-card-knowledge-test.png";

const meta: Meta = {
  title: "Components/Blocks/Promo Card",
  component: "opo-promo-card",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      page: null,
      description: {
        component:
          "Promo card block for promotional product areas. It combines a heading, supporting text, visual media and either a slotted action or a pending state.",
      },
    },
  },
  argTypes: {
    heading: {
      control: "text",
      description: "Main heading displayed in the card header.",
      table: { defaultValue: { summary: "undefined" } },
    },
    description: {
      control: "text",
      description: "Supporting text displayed below the heading.",
      table: { defaultValue: { summary: "undefined" } },
    },
    imageSrc: {
      control: "text",
      description: "Image source used in the media area.",
      table: { defaultValue: { summary: "undefined" } },
    },
    imageAlt: {
      control: "text",
      description:
        "Accessible image alternative text. Leave empty when the image is decorative.",
      table: { defaultValue: { summary: '""' } },
    },
    headingLevel: {
      control: "select",
      options: [2, 3, 4, 5, 6],
      description:
        "Semantic heading level. The visual style remains unchanged.",
      table: { defaultValue: { summary: "3" } },
    },
    fullWidth: {
      control: "boolean",
      description: "Makes the card take the full available width.",
      table: { defaultValue: { summary: "false" } },
    },
    pending: {
      control: "boolean",
      description:
        "Shows a non-interactive pending state instead of the action slot.",
      table: { defaultValue: { summary: "false" } },
    },
    pendingLabel: {
      control: "text",
      description: "Text displayed when the card is in pending state.",
      table: { defaultValue: { summary: "Próximamente" } },
    },
    actionLabel: {
      control: "text",
      description: "Story-only label used for the slotted action example.",
      table: {
        category: "Story helpers",
      },
    },
  },
};

export default meta;

type PromoCardArgs = {
  heading: string;
  description?: string;
  imageSrc: string;
  imageAlt?: string;
  headingLevel?: 2 | 3 | 4 | 5 | 6;
  fullWidth?: boolean;
  pending?: boolean;
  pendingLabel?: string;
  actionLabel?: string;
};

/**
 * Helper to render individual stories with a layout override
 * to test subgrid compatibility safely.
 */
function renderStory(content: unknown) {
  return html`
    <style>
      .story-single-container {
        min-height: 400px;
        padding: 30px 40px 40px;
        box-sizing: border-box;
        max-inline-size: 500px;
        margin-inline: auto;
        display: grid;
        grid-template-columns: 100%;
        grid-template-rows: max-content max-content max-content;
        align-content: start;
        gap: 0;
      }
      /* Forzamos externamente que el componente actúe en subgrid en la prueba */
      .story-single-container opo-promo-card {
        display: contents;
      }
      .story-single-container opo-promo-card::part(base) {
        display: grid;
        grid-template-rows: subgrid;
        grid-row: span 3;
        row-gap: 0;
      }
    </style>
    <div class="story-single-container">${content}</div>
  `;
}

function renderPromoCard(args: PromoCardArgs) {
  return html`
    <opo-promo-card
      heading=${args.heading}
      description=${ifDefined(args.description)}
      image-src=${args.imageSrc}
      image-alt=${ifDefined(args.imageAlt)}
      heading-level=${args.headingLevel ?? 3}
      ?full-width=${args.fullWidth}
      ?pending=${args.pending}
      pending-label=${ifDefined(args.pendingLabel)}
    >
      ${!args.pending
        ? html`
            <opo-button slot="action" variant="primary">
              ${args.actionLabel ?? "Acceder gratis"}
            </opo-button>
          `
        : null}
    </opo-promo-card>
  `;
}

// ==================== BASIC ====================

export const Default: StoryObj<PromoCardArgs> = {
  args: {
    heading: "OpositaTest es Gratis",
    description: "¡Accede gratis a todos los test de oposiciones!",
    imageSrc: freeTestsImage,
    imageAlt: "",
    headingLevel: 3,
    actionLabel: "Acceder gratis",
  },
  render: (args) => renderStory(renderPromoCard(args)),
};

// ==================== STATES ====================

export const Pending: StoryObj<PromoCardArgs> = {
  args: {
    heading: "Temario avanzado",
    description:
      "Nuevos recursos de preparación estarán disponibles próximamente.",
    imageSrc: pendingImage,
    imageAlt: "",
    headingLevel: 3,
    pending: true,
  },
  render: (args) => renderStory(renderPromoCard(args)),
};

export const CustomPendingLabel: StoryObj<PromoCardArgs> = {
  args: {
    heading: "Nuevos simulacros",
    description: "Estamos preparando nuevos simulacros para esta oposición.",
    imageSrc: pendingImage,
    imageAlt: "",
    headingLevel: 3,
    pending: true,
    pendingLabel: "Disponible pronto",
  },
  render: (args) => renderStory(renderPromoCard(args)),
};

// ==================== COMPOSITION ====================

export const WithActionSlot: StoryObj<PromoCardArgs> = {
  args: {
    heading: "Test de conocimientos",
    description: "¿Cuánto sabes sobre el proceso de la oposición?",
    imageSrc: knowledgeTestImage,
    imageAlt: "",
    headingLevel: 3,
    actionLabel: "Hacer test de conocimientos",
  },
  render: (args) => renderStory(renderPromoCard(args)),
};

export const SemanticHeading: StoryObj<PromoCardArgs> = {
  args: {
    heading: "Recursos para preparar tu oposición",
    description:
      "El nivel semántico del heading puede adaptarse a la jerarquía de la página sin cambiar el estilo visual.",
    imageSrc: freeTestsImage,
    imageAlt: "",
    headingLevel: 4,
    actionLabel: "Ver recursos",
  },
  render: (args) => renderStory(renderPromoCard(args)),
};

// ==================== LAYOUT ====================

export const FullWidth: StoryObj<PromoCardArgs> = {
  args: {
    heading: "OpositaTest es Gratis",
    description: "¡Accede gratis a todos los test de oposiciones!",
    imageSrc: freeTestsImage,
    imageAlt: "",
    headingLevel: 3,
    fullWidth: true,
    actionLabel: "Acceder gratis",
  },
  render: (args) => html`
    <style>
      .story-fullwidth-container {
        width: 700px;
        border: 1px dashed #afafb3;
        padding: 16px;
        min-height: 400px;
        box-sizing: border-box;
        display: grid;
        grid-template-columns: 100%;
        grid-template-rows: max-content max-content max-content;
        align-content: start;
        gap: 0;
      }
      .story-fullwidth-container opo-promo-card {
        display: contents;
      }
      .story-fullwidth-container opo-promo-card::part(base) {
        display: grid;
        grid-template-rows: subgrid;
        grid-row: span 3;
        row-gap: 0;
      }
    </style>
    <div class="story-fullwidth-container">${renderPromoCard(args)}</div>
  `,
};

export const CardGroup: StoryObj<PromoCardArgs> = {
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story:
          "Example layout showing repeated promo cards inside a responsive grid.",
      },
    },
  },
  render: () => html`
    <style>
      .opo-promo-cards-grid {
        display: grid;
        grid-template-columns: minmax(min(100%, 333px), 333px);
        justify-content: center;
        padding: 30px 40px 40px;
        gap: 48px 0;
      }

      .opo-promo-cards-grid opo-promo-card {
        margin-bottom: 0;
      }

      .opo-promo-cards-grid opo-promo-card::part(base) {
        display: flex !important;
        flex-direction: column !important;
      }

      @media (min-width: 768px) and (max-width: 1119px) {
        .opo-promo-cards-grid {
          grid-template-columns: repeat(2, 333px);
          grid-auto-rows: subgrid;
          grid-template-rows: repeat(3, max-content);

          /* CLAVE: Ponemos el gap de filas a 0 para que no se herede */
          /* dentro de las tarjetas y no recorte las imágenes */
          gap: 0 48px;
        }

        .opo-promo-cards-grid opo-promo-card {
          display: contents !important;
        }

        /* Añadimos un margen inferior a los elementos de la primera fila */
        /* para separarlos de la segunda fila de tarjetas de manera limpia */
        .opo-promo-cards-grid opo-promo-card:nth-child(-n + 2)::part(base) {
          margin-bottom: 48px;
        }

        .opo-promo-cards-grid opo-promo-card::part(base) {
          display: grid !important;
          grid-template-rows: subgrid !important;
          grid-row: span 3 !important;
          row-gap: 0 !important;
        }
      }

      @media (min-width: 1120px) {
        .opo-promo-cards-grid {
          grid-template-columns: repeat(3, 333px);
          grid-auto-rows: subgrid;
          grid-template-rows: repeat(3, max-content);
          align-content: start;
          gap: 0 48px;
        }

        .opo-promo-cards-grid opo-promo-card {
          display: contents !important;
          margin-bottom: 0;
        }

        .opo-promo-cards-grid opo-promo-card::part(base) {
          display: grid !important;
          grid-template-rows: subgrid !important;
          grid-row: span 3 !important;
          row-gap: 0 !important;
          margin-bottom: 0 !important;
        }
      }
    </style>

    <div style="min-height: 500px;">
      <div class="opo-promo-cards-grid">
        <opo-promo-card
          full-width
          heading="OpositaTest es Gratis"
          description="¡Accede gratis a todos los test de oposiciones!"
          image-src=${freeTestsImage}
          image-alt=""
        >
          <opo-button slot="action" variant="primary">
            Acceder gratis
          </opo-button>
        </opo-promo-card>

        <opo-promo-card
          full-width
          heading="Test de conocimientos"
          description="¿Cuánto sabes sobre el proceso de la oposición?"
          image-src=${knowledgeTestImage}
          image-alt=""
        >
          <opo-button slot="action" variant="primary"> Hacer test </opo-button>
        </opo-promo-card>

        <opo-promo-card
          full-width
          heading="Nuevos recursos"
          description="Estamos preparando nuevas herramientas para ayudarte a estudiar."
          image-src=${pendingImage}
          image-alt=""
          pending
        ></opo-promo-card>
      </div>
    </div>
  `,
};
