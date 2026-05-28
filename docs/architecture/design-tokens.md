# Design Tokens

---

## Overview

> [!NOTE]
> La **nomenclatura** propuesta para los system tokens (`--sys-`) debe entenderse como una interpretación razonada a partir de la landing implementada, los valores presentes en el archivo de tokens original y los posibles contextos de uso observados durante la prueba.
>
> Su objetivo es ilustrar cómo los reference tokens podrían evolucionar hacia una capa semántica capaz de expresar decisiones reutilizables de producto, interfaz y marca.
>
> En un entorno real, esta nomenclatura debería consensuarse con diseño para garantizar que los nombres utilizados tanto en Figma como en código respondan al mismo lenguaje compartido.

Los tokens del sistema se organizan en distintas capas independientes con el objetivo de desacoplar:

- los valores base del sistema,
- las decisiones semánticas reutilizables,
- y los detalles concretos de implementación de componentes.

```txt
reference tokens
        ↓
system tokens
        ↓
component-scoped variables
        ↓
component styles
```

---

## Arquitectura de tokens

| Nivel | Prefijo | Propósito | Ejemplo |
| - | -- | | - |
| **Reference** | `--ref-` | Valores primitivos base | `--ref-font-size-500` |
| **System** | `--sys-` | Decisiones reutilizables | `--sys-typography-heading-md-size` |
| **Scoped** | `--opo-` | Variables internas | `--opo-button-height` |
| **Component** | `--cmp-` | Adaptación específica | `--cmp-button-bg` |

### Reference Tokens (`--ref-`)

- Son primitives reutilizables.
- Contienen los valores primitivos compartidos del sistema (`colors`, `typography`, `spacing`, `radius`, `shadows`, etc.).
- No representan intención ni contexto de uso.

Ejemplos:

```css
--ref-color-amber-500
--ref-spacing-400
--ref-radius-md
--ref-shadow-sm
--ref-motion-duration-fast
```

Su función es proporcionar una base estable sobre la que construir decisiones semánticas.

### System Tokens (`--sys-`)

- Actúan como capa de abstracción sobre los reference tokens.
- Expresan intención de uso.
- Pueden adaptarse según tema, contexto o estrategia responsive o de accesilibidad.

Ejemplos:

```css
--sys-color-text-primary
--sys-color-surface-page
--sys-color-border-default
```

Por ejemplo:

```css
--sys-color-text-primary: var(--ref-color-zinc-950);
```

Esto permite cambiar el valor real del color sin modificar los componentes que consumen la decisión semántica.

### Component-Scoped Variables (`--opo-*`)

Además de los reference y system tokens, algunos componentes utilizan **variables CSS internas** scoped con prefijos propios del componente.

Ejemplos reales del sistema:

```css
--opo-button-height
--opo-button-font-size
--opo-button-padding-block
```

Estas variables no representan necesariamente una capa formal de “component tokens” globales del sistema, sino variables internas orientadas a:

- desacoplar detalles de implementación,
- mejorar legibilidad y mantenibilidad del componente,
- facilitar overrides controlados,
- y evitar repetir decisiones internas complejas dentro del CSS del componente.

Por ejemplo:

```css
.opo-button {
  --opo-button-height: 40px;
  --opo-button-font-size: var(--sys-typography-action-md-size);

  min-height: var(--opo-button-height);
  font-size: var(--opo-button-font-size);
}
```

### Possible Future Component Tokens (`--cmp-*`)

- Adaptan las decisiones globales del sistema a las necesidades concretas de cada componente.
- Favorecen una arquitectura más independiente entre capas y extensible.
- Permiten introducir una capa adicional de personalización sin acoplar directamente el componente al sistema global.

> [!NOTE]
> En esta iteración, se ha priorizado una aproximación más ligera basada en **variables scoped** por componente frente a una capa completa de `--cmp-*` globales, evitando introducir abstracción semántica prematuramente.

En sistemas más complejos o multi-brand, podría evolucionarse progresivamente hacia una capa más formal de _component tokens_ públicos reutilizables.

Ejemplo conceptual:

```css
--cmp-button-background: var(--sys-color-action-primary);
```

---

## Flujo de consumo

La dirección habitual de consumo dentro del sistema seguiría una estructura similar a:

```txt
reference tokens
(--ref-color-amber-500: #ffb142)
        ↓
system tokens
(--sys-color-brand: var(--ref-color-amber-500))
        ↓
component tokens
(--cmp-button-bg: var(--sys-color-brand))
        ↓
component styles
.button {
  background-color: var(--cmp-button-bg);
}
```

No obstante, esta arquitectura debe aplicarse con criterio. Añadir capas que no aportan intención real puede generar abstracción innecesaria.

---

## Filosofía de tokens

La regla principal es:

```txt
Reference tokens = valor
System tokens = intención
Component tokens = adaptación
```

Un system token debería aportar significado. Si únicamente renombra un reference token sin añadir intención, puede convertirse en una capa redundante.

Por ejemplo, esto aporta poco:

```css
--sys-radius-md: var(--ref-radius-md);
```

Pero esto aporta más intención:

```css
--sys-radius-card: var(--ref-radius-md);
```

> [!NOTE]
> Por otro lado, no todos los component tokens necesariamente deberían exponerse globalmente mediante `:root`.

> Aquellos tokens que formen parte de la API pública de personalización del componente (`theming`, `branding`, `white-label`, etc.) pueden exponerse como tokens globales reutilizables. Sin embargo, tokens más específicos o relacionados con detalles internos de implementación suelen mantenerse scoped dentro del propio componente para evitar acoplamientos innecesarios y reducir contaminación del namespace global.

---

## Color Tokens

Los colores se organizan como reference color tokens reutilizables.

En lugar de asociar directamente los tokens a contextos específicos de uso `(primary, hover, background, pressed…)`, he adoptado una estrategia de nomenclatura más neutral y escalable inspirada en sistemas modernos de diseño como Tailwind CSS.

```css
/* Before */
--color-primary-main-hover: #ffc470;

/* After */
--ref-color-amber-400: oklch(0.8567 0.1219 74.66);
```

Esto permite **desacoplar la definición física del color de su intención de uso** dentro de la interfaz.

Posteriormente, estos reference tokens pueden ser reutilizados por system tokens que representan el propósito real del color dentro del sistema.

Además, he optado por definir los colores utilizando `oklch()` debido a las ventajas que ofrece frente a espacios de color tradicionales como `hex` o `hsl`:

- Permite controlar de forma independiente luminosidad (L), saturación (C) y tono (H), facilitando la construcción de paletas más coherentes y sistemáticas.
- Produce transiciones cromáticas perceptualmente más uniformes.
- Evita problemas habituales de otros modelos de color donde algunos tonos pueden volverse excesivamente apagados, grisáceos o artificialmente saturados.

Para la conversión y validación de colores entre formatos `hex` y `oklch()` he utilizado [oklch.com](https://oklch.com/), en lugar del selector nativo de VS Code, ya que se trata de una herramienta especializada en espacios de color desarrollada por [Evil Martians](https://evilmartians.com/devtools) y creada por Andrey Sitnik (autor de PostCSS y Autoprefixer).

Por otro lado, he conservado todos los valores cromáticos presentes en el sistema original, incluso cuando algunos tonos neutros resultaban visualmente muy próximos (ej: `#ebeaec`, `#eeedf0`), para preservar trazabilidad respecto a la propuesta inicial y evitar perder posibles usos previstos desde diseño.

Los system color tokens expresan intención visual.

Ejemplos:

```css
--sys-color-text-primary: var(--ref-color-zinc-950);
--sys-color-surface-page: var(--ref-color-zinc-50);
--sys-color-border-default: var(--ref-color-zinc-400);
```

### Brand & Feedback Colors

También se definen colores semánticos asociados a marca y feedback:

```css
--sys-color-brand-primary
--sys-color-brand-accent

--sys-color-danger
--sys-color-success
--sys-color-warning
```

Estos tokens permiten que componentes como botones, iconos o estados visuales puedan usar decisiones del sistema sin depender directamente de valores primitivos.

---

## Container Tokens

El sistema original ya incluía una pequeña serie de tokens orientados a definir restricciones de anchura máxima para distintos contextos de layout y composición.

```css
/* Before */
--container-medium: 880px;

/* After */
--ref-container-md: 880px;
```

He optado por mantener esta aproximación, actualizando únicamente la nomenclatura neutral hacia una convención más consistente con el resto de reference tokens del sistema.

Estos tokens representan restricciones reutilizables de composición que posteriormente pueden ser consumidas por distintas capas del sistema (`sections`, wrappers, grids o componentes) según las necesidades de cada contexto.

Los valores se han mantenido en `px` al considerar que representan restricciones estructurales de layout y no escalas tipográficas. Esto permite preservar una composición horizontal más estable y predecible independientemente de posibles cambios en el `font-size` raíz del navegador.

Por otro lado, he optado deliberadamente por mantener una **escala de containers relativamente reducida** para evitar introducir una granularidad excesiva que añadiría complejidad prematura al sistema.

---

## Spacing Tokens

Aunque muchos sistemas modernos utilizan unidades relativas como `rem` también para los spacing tokens, he decidido mantener los espaciados estructurales del sistema en `px`.

Si bien utilizar `rem` en spacing puede resultar beneficioso en contextos más editoriales o centrados en lectura, en interfaces UI y layouts estructurales **un escalado excesivo del spacing puede reducir significativamente el espacio útil disponible para el contenido**, comprometiendo la densidad visual de la interfaz y afectando potencialmente a la experiencia de uso.

Por este motivo, esta decisión busca preservar un comportamiento espacial más estable y predecible dentro de la interfaz, evitando que el espaciado crezca proporcionalmente junto al tamaño tipográfico cuando el usuario modifica el `font-size` raíz del navegador.

Por otro lado, he refactorizado la nomenclatura original de los spacing tokens para alinearla con la utilizada en el resto de tokens del sistema, siguiendo la misma lógica de desacoplamiento del contexto de uso.

```css
/* Before */
--spacing-desktop-xxs: 8px;

/* After */
--ref-spacing-200: 8px;
```

---

## Radius Tokens

El sistema original ya incorporaba una serie reducida de valores de `border-radius` orientados a construir una interfaz visualmente suave y consistente.

```css
/* Before */
--radius-md: 24px;

/* After */
--ref-radius-lg: 24px;
```

He optado por mantener esta aproximación, actualizando la nomenclatura hacia una convención más alineada con el resto de reference tokens del sistema.

Aunque los tokens originales utilizaban radios relativamente amplios (`16px`, `24px`, `32px`), probablemente alineados con una dirección visual más “soft” y contemporánea, también se han incorporado tamaños más reducidos como `6px`, presentes en determinados elementos del diseño original (`buttons`), para cubrir componentes funcionales de menor escala.

---

## Avoiding Over-Abstraction

En esta iteración, varias escalas del sistema —como radius, shadows o motion— se han mantenido deliberadamente contenidas para evitar introducir semántica y abstracción prematuramente.

Estas capas podrían evolucionar progresivamente cuando aparezcan patrones de uso más estables.

Ejemplos actuales:

```css
--ref-radius-md
--ref-shadow-sm
--ref-motion-duration-fast
```

Posibles evoluciones futuras:

```css
--sys-radius-card
--sys-shadow-overlay
--sys-motion-duration-feedback
```

No todos los valores necesitan pasar por todas las capas.

Una arquitectura de tokens madura no consiste en crear más tokens, sino en crear tokens con intención clara.

Ejemplo de abstracción innecesaria:

```css
--sys-motion-duration-fast: var(--ref-motion-duration-fast);
```

Si el token no añade intención, quizá es mejor usar el reference token directamente o esperar a que exista un patrón real.

Ejemplo con más intención:

```css
--sys-motion-duration-feedback: var(--ref-motion-duration-fast);
```

Aun así, incluso este tipo de token debe introducirse solo cuando el sistema lo necesite de forma consistente.

---

## Alcance actual

El objetivo principal en esta iteración es:

- establecer una base reutilizable,
- mejorar consistencia visual,
- evitar valores mágicos,
- y preparar el sistema para futuras evoluciones.

No se ha intentado cerrar una taxonomía semántica definitiva, ya que en un entorno real debería consensuarse con diseño y evolucionar junto al producto.

---

## Validación de tokens

El sistema incorpora validación automática de custom properties utilizadas en CSS.
(plugin: `stylelint-value-no-unknown-custom-properties`)

Esto permite detectar referencias a tokens inexistentes durante desarrollo y linting.

Por ejemplo:

```css
color: var(--sys-color-does-not-exist);
```

genera un warning automático mediante Stylelint.

La validación utiliza como fuente de verdad los archivos de tokens del sistema (`reference.tokens.css` y `system.tokens.css`) para ayudar a mantener consistencia entre:

- tokens definidos,
- tokens consumidos,
- y documentación del sistema.

El objetivo principal es reducir:

- errores tipográficos,
- referencias inválidas,
- y divergencias entre la arquitectura de tokens y el consumo real dentro de componentes.

---

## Posibles evoluciones futuras

Posibles evoluciones futuras:

- **Definición más madura de tokens**
  - Evolucionar progresivamente desde variables scoped por componente (`--opo-*`) hacia una capa más formal de component tokens reutilizables (`--cmp-*`) en aquellos casos donde aparezcan necesidades reales de `theming`, `white-label` o reutilización `cross-product`.
  - Esto permitiría desacoplar todavía más los componentes de las decisiones globales del sistema.

- **Tematización light/dark**
  - Incorporar soporte oficial para múltiples temas visuales (`light`, `dark`, high-contrast, etc.) mediante system tokens adaptativos.
  - Esto implicaría separar más claramente los valores semánticos (`--sys-*`) de los reference tokens base (`--ref-*`).

- **Soporte multi-brand**
  - Permitir que distintas marcas o productos compartan la misma librería de componentes reutilizando la arquitectura de tokens y modificando únicamente capas de branding.
  - Por ejemplo: colores de marca, tipografía, radios, motion o iconografía específica.

- **Integración con Style Dictionary**
  - Automatizar generación, transformación y distribución de design tokens mediante herramientas como [Style Dictionary](https://styledictionary.com/).
  - Esto facilitaría exportar tokens hacia:
    - CSS,
    - TypeScript,
    - JSON,
    - iOS,
    - Android,
    - o tooling de diseño.

- **Sincronización con Figma Tokens / Tokens Studio**
  - Explorar una sincronización más estructurada entre diseño y desarrollo utilizando herramientas como Tokens Studio.
  - El objetivo sería reducir divergencias entre Figma y código y favorecer un lenguaje compartido entre equipos.

- **Versionado de tokens**
  - Introducir estrategias de versionado y cambios controlados para tokens críticos del sistema.
  - Esto ayudaría a gestionar breaking changes, migraciones y compatibilidad entre componentes y aplicaciones consumidoras.

- **Validación automática de tokens**
  - Incorporar tooling que permita detectar automáticamente:
    - tokens duplicados,
    - referencias inválidas,
    - inconsistencias semánticas,
    - naming incorrecto,
    - o dependencias circulares entre tokens.

- **Generación automática de documentación visual**
  - Generar documentación visual y playgrounds directamente desde la fuente de tokens.
  - Por ejemplo:
    - paletas de color,
    - escalas tipográficas,
    - spacing systems,
    - motion tokens,
    - o ejemplos de theming en Storybook.
