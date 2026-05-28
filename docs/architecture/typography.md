# Typography

---

## Overview

La estrategia tipográfica del sistema se ha planteado como una capa reutilizable dentro de la arquitectura de Design Tokens.

El objetivo principal es desacoplar los valores tipográficos base de su contexto de uso, evitando que la tipografía quede demasiado ligada a nombres de dispositivo, breakpoint o componente concreto.

La estructura general sigue esta lógica:

```txt
reference typography tokens
        ↓
system typography tokens
        ↓
component styles
```

---

## Font Family

El archivo de tokens original definía una familia tipográfica de seguridad `(sans-serif)`. Con el objetivo de mejorar el comportamiento de carga de fuentes y ofrecer una experiencia visual más consistente entre plataformas, he decidido ampliar la fallback font stack incorporando `system-ui`.

De este modo, si IBM Plex Sans no está disponible o todavía no ha terminado de cargar, el navegador utilizará automáticamente la **tipografía nativa del sistema operativo** (SF Pro en macOS/iOS, Segoe UI en Windows, Roboto en Android, etc.), proporcionando una _experiencia visual más consistente y natural_ que la ofrecida por una familia genérica `sans-serif`.

Además, la nomenclatura original ha sido actualizada hacia una convención más neutral y alineada con la arquitectura general del sistema de tokens.

```css
/* Before */
--font-family-main: "IBM Plex Sans", sans-serif;

/* After */
--ref-font-family-sans: "IBM Plex Sans", system-ui, sans-serif;
```

---

## Estrategia de Font Size

La escala tipográfica original utilizaba tokens con un naming acoplado tanto al viewport `(desktop, mobile)` como al contexto visual `(xs, xl, xxl)`.
Con el objetivo de desacoplar la tipografía del contexto de uso y mejorar la escalabilidad del sistema, he refactorizado la nomenclatura hacia un sistema de _reference typography tokens_ neutral y reutilizable.

```css
/* Before */
--font-size-desktop-xs: 0.75rem;

/* After */
--ref-font-size-100: 0.75rem;
```

La nueva nomenclatura:

- elimina referencias directas a dispositivos,
- evita acoplar valores a un contexto visual concreto,
- facilita la reutilización,
- y permite evolucionar la escala sin renombrar tokens constantemente.
- sigue una aproximación similar a la utilizada por sistemas modernos como _Tailwind CSS, Material Design o Spectrum._

Los reference font-size tokens representan únicamente valores tipográficos reutilizables. No deberían expresar intención final de uso.

En su lugar, las decisiones tipográficas reutilizables del sistema se encapsulan mediante system tokens (`--sys-`), que posteriormente son adaptados a través de component tokens específicos (`--cmp-`) consumidos finalmente por los componentes.

```css
/* Example */
--sys-typography-body-md-size: var(--ref-font-size-300);
```

Esta separación entre **reference tokens** y **system tokens** mejora la reutilización, mantenibilidad y escalabilidad del sistema, además de facilitar futuras refactorizaciones y la introducción de responsive o fluid typography mediante `clamp()`.

---

## Line Height

Tras analizar los valores de `line-height` definidos en los diseños de Figma, he podido identificar y abstraer una **escala tipográfica consistente** en un conjunto más reducido de tokens reutilizables de interlineado.

En lugar de asociar los tokens a viewports específicos (`desktop`,`mobile`) o a contextos de uso tipográfico (`heading`,`body`), he adoptado una estrategia de nomenclatura más neutral basada en la densidad visual y reutilización transversal.

```css
/* Before */
--font-line-height-desktop-m: 1.5rem;

/* After */
--ref-line-height-base: 1.5;
```

He definido los tokens intencionadamente como **valores unitless** (sin unidad) en lugar de utilizar medidas absolutas en `px` o `rem`, ya que los valores unitless proporcionan un comportamiento tipográfico más flexible y resiliente al escalar proporcionalmente respecto al tamaño de fuente calculado de cada elemento, en lugar de depender del `font-size` raíz del documento (`html`).

Por ejemplo, un valor de `1.5` significa que el line-height calculado será equivalente al `150%` del tamaño de fuente actual del elemento.

Esto resulta especialmente útil en escenarios de **tipografía fluida** como:

```css
font-size: clamp(2rem, 5vw, 4rem);
line-height: 1.2;
```

La escala propuesta representa diferentes densidades tipográficas:

```css
--ref-line-height-none: 1;
--ref-line-height-tight: 1.2;
--ref-line-height-snug: 1.25;
--ref-line-height-normal: 1.4;
--ref-line-height-base: 1.5;
--ref-line-height-relaxed: 1.625;
--ref-line-height-loose: 1.8;
```

Cada valor responde a una intención visual distinta:

- `none`: casos específicos sin espacio adicional, como iconos.
- `tight`: títulos grandes.
- `snug`: headings estándar.
- `normal`: texto compacto.
- `base`: texto de lectura general.
- `relaxed`: lectura más cómoda.
- `loose`: bloques de texto más espaciosos.

---

## Font Weights

Aunque [**_IBM Plex Sans_**](https://www.ibm.com/plex/specs/) dispone oficialmente de una gama de pesos tipográficos más amplia, he decidido mantener deliberadamente la escala original de `font-weight` (`400`, `500`, `600` y `700`), ya que un conjunto reducido y controlado contribuye a mantener una jerarquía tipográfica más coherente y mantenible dentro de la interfaz.

Esta decisión reduce la complejidad visual del sistema y evita un uso excesivamente granular de pesos tipográficos que raramente aporta valor real en contextos UI.

La única modificación realizada fue la **actualización de la nomenclatura de los tokens** para alinearla con la convención utilizada en el resto de reference tokens del sistema.

```css
/* Before */
--font-weight-text: 400;

/* After */
--ref-font-weight-regular: 400;
```

---

## Letter Spacing

El sistema original no incluía tokens específicos para `letter-spacing`. Aunque el tracking suele tener un impacto más sutil que otras propiedades tipográficas como `font-size` o `line-height`, también contribuye a la consistencia del sistema tipográfico.

Por este motivo, he optado por incorporar una pequeña escala de **reference letter-spacing tokens** reutilizables.

Estos valores se han definido en unidades relativas `em` para garantizar que el espaciado escale proporcionalmente junto al tamaño tipográfico, mejorando así la consistencia visual entre distintos tamaños de fuente.

De nuevo, estos tokens no representan estilos tipográficos finales, sino valores tipográficos reutilizables del sistema.

---

## Fluid Typography

La fluid typography puede ser útil en contextos expresivos como:

- hero sections,
- headings principales,
- marketing pages,
- composiciones editoriales.

Sin embargo, no toda la tipografía de una interfaz necesita ser fluida.

En componentes UI más funcionales, una escala estable suele favorecer:

- legibilidad,
- previsibilidad,
- consistencia,
- y menor complejidad.

Por este motivo, la estrategia propuesta es híbrida: usar fluid typography solo cuando aporte valor real.

---

## Estrategia clamp()

`clamp()` permite definir tamaños fluidos con límites mínimo y máximo.

Ejemplo:

```css
--sys-typography-heading-md-size: clamp(
  var(--ref-font-size-500),
  1rem + 0.8vw,
  var(--ref-font-size-700)
);
```

Este patrón permite que el tamaño tipográfico crezca progresivamente con el viewport, sin exceder unos límites controlados.

Esto puede ayudar a reducir media queries específicas para ciertos textos expresivos.

---

## Responsive Typography

La tipografía responsive no se plantea como una regla universal aplicada a toda la interfaz.

En su lugar, se recomienda decidir caso por caso:

```txt
UI text → escala estable
Marketing/display text → posible escala fluida
Long-form reading → line-height y ancho de línea controlados
```

Esta aproximación evita convertir `clamp()` en una solución indiscriminada.

El objetivo no es que todo sea fluido, sino que la tipografía responda mejor cuando el contexto visual lo justifique.

---

## Alcance actual

En esta iteración, la estrategia tipográfica se centra en:

- crear una base de reference tokens reutilizables,
- mejorar la nomenclatura,
- introducir line-height unitless,
- añadir una pequeña escala de letter-spacing,
- y dejar abierta la posibilidad de fluid typography sin formalizarla en exceso.

No se ha intentado cerrar una escala tipográfica semántica definitiva.

En un entorno real, esta capa debería evolucionar junto con diseño, producto y necesidades reales de componentes.

---

## Posibles evoluciones futuras

Posibles mejoras futuras:

- definir una escala completa de system typography tokens,
- documentar estilos tipográficos por rol,
- incorporar fluid typography en headings específicos,
- validar la escala tipográfica con contenido real,
- revisar contraste y legibilidad en distintos tamaños,
- y sincronizar tokens tipográficos con Figma.
