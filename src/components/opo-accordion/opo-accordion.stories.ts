import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";

const meta: Meta = {
  title: "Components/Molecules/Accordion",
  component: "opo-accordion",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      page: null,
      description: {
        component:
          "Accordion del Design System OPO. Permite mostrar y ocultar contenido en secciones expandibles, con soporte para modo single, multiple, variantes visuales, estado disabled y control mediante value/defaultValue.",
      },
    },
  },
  argTypes: {
    type: {
      control: "select",
      options: ["single", "multiple"],
      description: "Comportamiento de selección: un item abierto o varios.",
      table: { defaultValue: { summary: "multiple" } },
    },
    value: {
      control: "text",
      description:
        "Valor controlado. En modo multiple puede contener valores separados por espacios.",
      table: { defaultValue: { summary: "undefined" } },
    },
    defaultValue: {
      control: "text",
      description:
        "Valor inicial no controlado. En modo multiple puede contener valores separados por espacios.",
      table: { defaultValue: { summary: "undefined" } },
    },
    variant: {
      control: "select",
      options: ["default", "outlined"],
      description: "Estilo visual del accordion.",
      table: { defaultValue: { summary: "default" } },
    },
    collapsible: {
      control: "boolean",
      description:
        "Permite cerrar el item abierto al volver a interactuar con él en modo single.",
      table: { defaultValue: { summary: "true" } },
    },
    fullWidth: {
      control: "boolean",
      description: "Hace que el accordion ocupe todo el ancho disponible.",
      table: { defaultValue: { summary: "false" } },
    },
    opoChange: {
      action: "opoChange",
      description: "Evento emitido cuando cambia el valor abierto.",
      table: {
        category: "Events",
      },
    },
  },
};

export default meta;

type AccordionArgs = {
  type?: "single" | "multiple";
  value?: string;
  defaultValue?: string;
  variant?: "default" | "outlined";
  collapsible?: boolean;
  fullWidth?: boolean;
  opoChange?: (event: CustomEvent<string | string[] | undefined>) => void;
};

function renderAccordion(args: AccordionArgs) {
  return html`
    <opo-accordion
      type=${args.type ?? "multiple"}
      value=${ifDefined(args.value)}
      default-value=${ifDefined(args.defaultValue)}
      variant=${args.variant ?? "default"}
      .collapsible=${args.collapsible ?? true}
      ?full-width=${args.fullWidth}
      @opoChange=${args.opoChange}
    >
      <opo-accordion-item
        value="free-tests"
        label="¿Los test de oposiciones de OpositaTest son gratuitos?"
      >
        <p>
          En OpositaTest puedes realizar test de prueba gratis de cada oposición
          para conocer cómo funciona la plataforma, nosotros a este test le
          llamamos demo y puedes completarlo tantas veces como quieras. Para
          hacer test por temas, por materias, simulacros de examen, y muchos
          otros... deberás suscribirte a alguna de las oposiciones disponibles
          en cualquiera de las duraciones que ofrecemos.
        </p>
      </opo-accordion-item>

      <opo-accordion-item
        value="study-method"
        label="¿Cómo estudiar para oposiciones tipo test?"
      >
        <p>
          La mejor manera de preparar una oposición tipo test es practicando con
          test. A medida que vas estudiando realizar test para validar los
          conocimientos, al finalizar la jornada practicar con un test de todo
          lo estudiado en el día y en los días previos, generando tus propios
          simulacros de examen, repasar con test de preguntas falladas, son sólo
          algunas de las técnicas que mejores resultados ofrecen.
        </p>
      </opo-accordion-item>

      <opo-accordion-item
        value="progress"
        label="¿Se pueden realizar test de temas concretos, test por materias, etc?"
      >
        <p>
          Sí, en OpositaTest puedes hacer los test a tu gusto, es decir, de
          temas concretos, mezclando varios temas, de una materia al completo,
          por apartados, de preguntas falladas, simulacros de examen, exámenes
          de convocatorias anteriores, etc… y todo con la garantía de estar
          practicando con el mejor contenido del mercado y siempre actualizado.
        </p>
      </opo-accordion-item>
    </opo-accordion>
  `;
}

function renderStory(content: unknown) {
  return html`
    <div
      style="
        padding: 80px 40px;
        box-sizing: border-box;
      "
    >
      ${content}
    </div>
  `;
}

// ==================== BASIC ====================

export const Default: StoryObj<AccordionArgs> = {
  args: {
    type: "multiple",
    variant: "default",
    collapsible: true,
  },
  render: (args) => renderStory(renderAccordion(args)),
};

// ==================== VARIANTS ====================

export const Outlined: StoryObj<AccordionArgs> = {
  args: {
    type: "multiple",
    variant: "outlined",
    collapsible: true,
  },
  render: (args) => renderStory(renderAccordion(args)),
};

// ==================== BEHAVIOR ====================

export const Single: StoryObj<AccordionArgs> = {
  args: {
    type: "single",
    defaultValue: "free-tests",
    collapsible: true,
  },
  render: (args) => renderStory(renderAccordion(args)),
};

export const Multiple: StoryObj<AccordionArgs> = {
  args: {
    type: "multiple",
    defaultValue: "free-tests progress",
    collapsible: true,
  },
  render: (args) => renderStory(renderAccordion(args)),
};

export const NotCollapsible: StoryObj<AccordionArgs> = {
  args: {
    type: "single",
    defaultValue: "free-tests",
    collapsible: false,
  },
  render: (args) => renderStory(renderAccordion(args)),
};

export const Controlled: StoryObj<AccordionArgs> = {
  args: {
    type: "single",
    value: "study-method",
    collapsible: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Ejemplo de uso controlado mediante value. El componente emite opoChange cuando se solicita un cambio, pero el estado visible depende del valor controlado desde fuera.",
      },
    },
  },
  render: (args) => renderStory(renderAccordion(args)),
};

// ==================== STATES ====================

export const WithDisabledItem: StoryObj<AccordionArgs> = {
  args: {
    type: "single",
    variant: "default",
    collapsible: true,
  },
  render: (args) =>
    renderStory(html`
      <opo-accordion
        type=${args.type ?? "multiple"}
        variant=${args.variant ?? "default"}
        .collapsible=${args.collapsible ?? true}
        @opoChange=${args.opoChange}
      >
        <opo-accordion-item
          value="available"
          label="¿Puedo practicar test desde cualquier dispositivo?"
        >
          <p>
            Sí. Puedes acceder a los test desde distintos dispositivos
            compatibles con navegador moderno.
          </p>
        </opo-accordion-item>

        <opo-accordion-item
          value="disabled"
          label="Contenido disponible próximamente"
          disabled
        >
          <p>Este contenido todavía no está disponible.</p>
        </opo-accordion-item>
      </opo-accordion>
    `),
};

// ==================== COMPOSITION ====================

export const RichContent: StoryObj<AccordionArgs> = {
  args: {
    type: "single",
    defaultValue: "study-method",
  },
  render: (args) =>
    renderStory(html`
      <opo-accordion
        type=${args.type ?? "multiple"}
        default-value=${ifDefined(args.defaultValue)}
        variant=${args.variant ?? "default"}
        .collapsible=${args.collapsible ?? true}
        @opoChange=${args.opoChange}
      >
        <opo-accordion-item
          value="study-method"
          label="¿Cómo puedo organizar una rutina de estudio?"
        >
          <p>
            Puedes organizar tu preparación combinando bloques de teoría, test y
            revisión de errores.
          </p>

          <ul>
            <li>Define objetivos semanales realistas.</li>
            <li>Reserva sesiones para repasar fallos frecuentes.</li>
            <li>Utiliza simulacros para medir evolución.</li>
          </ul>

          <p>
            Consulta también
            <opo-link href="/" variant="primary">la guía de estudio</opo-link>
            para ampliar información.
          </p>
        </opo-accordion-item>
      </opo-accordion>
    `),
};

// ==================== LAYOUT ====================

export const FullWidth: StoryObj<AccordionArgs> = {
  args: {
    type: "multiple",
    defaultValue: "free-tests",
    fullWidth: true,
  },
  render: (args) => renderStory(renderAccordion(args)),
};

// ==================== LONG LABEL ====================

export const LongLabel: StoryObj<AccordionArgs> = {
  args: {
    type: "multiple",
    defaultValue: "long-label",
    variant: "default",
    collapsible: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Edge case para validar títulos largos en varias líneas, alineación de iconos y comportamiento responsive del trigger.",
      },
    },
  },
  render: (args) =>
    renderStory(html`
      <opo-accordion
        type=${args.type ?? "multiple"}
        default-value=${ifDefined(args.defaultValue)}
        variant=${args.variant ?? "default"}
        .collapsible=${args.collapsible ?? true}
        @opoChange=${args.opoChange}
      >
        <opo-accordion-item
          value="long-label"
          label="¿Cómo puedo organizar una rutina de estudio semanal combinando teoría, test, simulacros de examen, repasos de preguntas?"
        >
          <p>
            Este ejemplo permite comprobar cómo se comporta el accordion cuando
            el título ocupa más de una línea, manteniendo la alineación de los
            iconos, el espaciado interno y la legibilidad del contenido.
          </p>
        </opo-accordion-item>

        <opo-accordion-item
          value="short-label"
          label="¿Puedo medir mi progreso?"
        >
          <p>
            Sí. Puedes revisar tus resultados por temas y detectar áreas que
            necesitan más refuerzo.
          </p>
        </opo-accordion-item>
      </opo-accordion>
    `),
};
