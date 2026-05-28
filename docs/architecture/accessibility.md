# Accessibility

---

## Overview

Aunque el alcance de la prueba no permitía desarrollar una auditoría completa de accesibilidad, muchas de las decisiones arquitectónicas del sistema se han planteado teniendo en cuenta principios básicos de accesibilidad y progressive enhancement desde el inicio.

Esto incluye aspectos como:

- uso de HTML semántico,
- jerarquía tipográfica consistente,
- focus states visibles,
- estrategias responsive compatibles con zoom y aumento de tamaño del texto,
- compatibilidad con `prefers-reduced-motion`,
- contraste suficiente,
- relaciones semánticas claras entre elementos interactivos y contenido accesible,
- y uso de atributos `aria-*` cuando resultaban necesarios para mejorar semántica o interacción.

Varias decisiones relacionadas con spacing, fluid typography, line-height unitless o container queries también se han planteado considerando su impacto sobre legibilidad, mantenibilidad y experiencia de uso.

Además, algunas de estas decisiones —como HTML semántico, estructura clara, responsive y performance— también pueden contribuir indirectamente a una mejor interpretación técnica del contenido.

---

## HTML semántico

Siempre que sea posible, la interfaz debe apoyarse primero en HTML semántico nativo.

Esto implica priorizar elementos como:

```html
<button>Guardar</button>

<a href="/about">Sobre nosotros</a>

<nav aria-label="Main navigation">...</nav>

<main>...</main>

<section>...</section>

<label for="email">Email</label>
<input id="email" name="email" />
```

antes de recurrir a roles personalizados o atributos ARIA.

La regla general es:

```txt
HTML semántico primero.
ARIA solo cuando aporta semántica que HTML no puede expresar por sí mismo.
```

ARIA puede mejorar la accesibilidad cuando se usa correctamente, pero también puede introducir confusión si se usa de forma innecesaria o incorrecta.

---

## Accesibilidad de iconos

El componente `opo-icon` distingue entre dos casos principales:

- iconos decorativos,
- e iconos con significado propio.

### Iconos decorativos

Por defecto, si no se proporciona una etiqueta accesible, el icono se considera decorativo.

En ese caso, el componente aplica:

```html
aria-hidden="true"
```

Esto evita que tecnologías asistivas anuncien iconos que no aportan información adicional.

Ejemplo:

```html
<opo-button>
  <opo-icon name="check"></opo-icon>
  Guardar
</opo-button>
```

En este caso, el texto visible `Guardar` ya comunica la acción. El icono no necesita ser anunciado.

### Iconos con significado

Cuando el icono transmite significado por sí mismo, debe proporcionarse una etiqueta accesible mediante `ariaLabel`.

Ejemplo:

```html
<opo-icon name="trash-2" aria-label="Eliminar elemento"></opo-icon>
```

En este caso, el componente renderiza:

```html
role="img" aria-label="Eliminar elemento"
```

permitiendo que el icono pueda anunciarse correctamente mediante tecnologías asistivas.

### Estrategia ariaLabel

La prop `ariaLabel` se utiliza para diferenciar entre:

```txt
decorative icon → aria-hidden="true"
meaningful icon → role="img" + aria-label
```

La intención es mantener una API sencilla y explícita:

```html
<!-- Decorative -->
<opo-icon name="star"></opo-icon>

<!-- Meaningful -->
<opo-icon name="warning" aria-label="Advertencia"></opo-icon>
```

### Evitando labels redundantes

No todos los iconos necesitan `aria-label`.

Si un icono aparece junto a texto visible que ya comunica el significado, normalmente debe tratarse como decorativo.

Ejemplo:

```html
<button>
  <opo-icon name="search"></opo-icon>
  Buscar
</button>
```

Aquí el texto visible ya proporciona el nombre accesible del botón.

Añadir `aria-label="Buscar"` al icono podría generar redundancia para lectores de pantalla.

### Controles solo con icono

Cuando un icono se utiliza dentro de un control sin texto visible, el nombre accesible debe vivir en el control interactivo, no necesariamente en el icono.

Ejemplo recomendado:

```html
<opo-button variant="ghost" size="icon" aria-label="Buscar">
  <opo-icon name="search"></opo-icon>
</opo-button>
```

En este caso:

- el botón recibe el nombre accesible,
- el icono sigue siendo decorativo,
- y la interacción queda correctamente descrita.

> [!NOTE]
> `opo-icon` no debe utilizarse como elemento interactivo por sí mismo. Si el icono dispara una acción, debería vivir dentro de un botón, link u otro control semántico.

### SVG personalizado mediante slot

`opo-icon` permite proporcionar un SVG personalizado mediante slot:

```html
<opo-icon aria-label="Icono personalizado">
  <svg slot="icon" viewBox="0 0 24 24">...</svg>
</opo-icon>
```

Este patrón está pensado principalmente para contenido estático.

Cuando se utiliza un SVG custom, se mantienen las mismas reglas generales:

- si es decorativo, no necesita etiqueta accesible,
- si comunica significado, debe proporcionarse `aria-label`,
- el SVG debería estar correctamente dimensionado,
- y debería respetar `currentColor` si forma parte de la interfaz.

---

## Color, contraste y currentColor

Los iconos heredan color mediante:

```css
currentColor
```

Esto permite que el color del icono venga definido por el contexto donde se utiliza.

Ejemplo:

```css
.opo-button {
  color: var(--sys-color-on-action-primary);
}
```

```html
<opo-button>
  <opo-icon name="check"></opo-icon>
  Guardar
</opo-button>
```

Esta estrategia aporta varias ventajas:

- reduce props visuales innecesarias,
- mantiene consistencia entre texto e iconos,
- favorece theming,
- y evita valores hardcodeados como `white` o `#fff`.

### Contraste de color

Aunque los iconos puedan heredar color del contexto, el contraste final debe validarse en la composición donde se utilizan.

La responsabilidad del contraste no recae únicamente en `opo-icon`, sino en la combinación final:

```txt
icon color + background color + context
```

---

## Motion Accessibility

El sistema contempla compatibilidad con:

```css
prefers-reduced-motion
```

para reducir animaciones no esenciales cuando el usuario así lo solicita desde el sistema operativo.

Ejemplo:

```css
@media (prefers-reduced-motion: reduce) {
  .opo-icon--spin {
    animation: none;
  }
}
```

La regla general es:

```txt
Motion funcional, sí.
Motion imprescindible, con cuidado.
Motion decorativa, reducible.
```

---

## Focus y navegación mediante teclado

Los componentes interactivos deben ser accesibles mediante teclado y mostrar estados de foco visibles.

Aunque `opo-icon` no es interactivo por sí mismo, suele utilizarse dentro de componentes que sí lo son:

- botones,
- links,
- menús,
- dropdowns,
- tabs,
- toolbars.

La responsabilidad del foco debe vivir en el elemento interactivo, no en el icono.

Ejemplo:

```html
<button>
  <opo-icon name="settings"></opo-icon>
  Configuración
</button>
```

El foco debe recaer sobre el botón, no sobre el icono.

---

## Comportamiento de foco en SVG

Los SVG internos del componente se renderizan con:

```html
focusable="false"
```

Esto ayuda a evitar que el SVG pueda recibir foco accidentalmente en ciertos navegadores o entornos, especialmente cuando se utiliza dentro de controles interactivos.

## Progressive Enhancement

Varias decisiones del sistema se han planteado como mejoras progresivas:

- `prefers-reduced-motion`,
- `currentColor`,
- `focusable="false"` en SVG,
- HTML semántico,
- line-height unitless,
- y tokens reutilizables para estados visuales.

La intención es que la interfaz siga funcionando de forma robusta incluso si ciertas mejoras visuales o de motion no están disponibles.

---

## Alcance actual

En esta iteración, la accesibilidad se ha abordado principalmente a nivel de foundations y componentes básicos.

Se han priorizado:

- semántica clara,
- iconos decorativos correctamente ocultos,
- soporte para iconos con etiqueta accesible,
- herencia de color mediante `currentColor`,
- reducción de motion no esencial,
- y buenas prácticas básicas de HTML.

No se ha realizado todavía una auditoría completa de accesibilidad automatizada o manual.

---

## Posibles mejoras futuras

Posibles mejoras futuras:

- auditoría con `axe-core`,
- pruebas manuales con lector de pantalla,
- validación sistemática de contraste,
- testing de navegación por teclado,
- documentación por componente de patrones ARIA,
- focus management para overlays y modales,
- y revisión de accesibilidad en estados responsive.
