# STENCIL LANDING CHALLENGE

Starter para una prueba técnica centrada en `Stencil`, `Web Components` y `Storybook`.

La base está preparada para que la persona candidata clone el repo, instale dependencias y empiece a trabajar sin perder tiempo en setup. El starter incluye un único componente de ejemplo, `opo-button`, y una landing externa separada de la librería.

## Objetivo de la prueba

Construir una landing page usando `Stencil` y documentar los componentes en `Storybook`.

La idea es que la página viva fuera de la librería de componentes, como ocurriría en una web consumidora del paquete.

## Lo que ya viene hecho

- Entorno base de Stencil listo para arrancar.
- Landing externa inicial en `landing/`.
- Un único componente de ejemplo: `opo-button`.
- Storybook configurado para documentar componentes de la librería.

El resto de componentes debe decidirlo y construirlo la persona candidata.

## Cómo consume la landing la librería

La landing no importa componentes uno a uno ni requiere tocar `package.json` cada vez que se añade uno nuevo.

La web externa carga solo el bundle raíz de Stencil desde:

`landing/main.ts`

Ese bundle registra automáticamente los Web Components compilados por la librería, así que cualquier componente nuevo que se cree en `src/components/` pasa a estar disponible en la landing tras recompilar.

## Requisitos esperados

- Usar `Stencil` para construir componentes reutilizables.
- Montar la landing desde la web externa, no desde un componente contenedor dentro de la librería.
- Documentar en Storybook los componentes.
- Organizar la solución con una jerarquía de componentes clara.

## Se valorará especialmente

- Reutilización real de componentes.
- Jerarquía de componentes bien pensada.
- Buen manejo de estados y variantes.
- Calidad visual general.
- Accesibilidad básica.
- Uso de CSS variables o un sistema visual consistente.

## Bonus

- Mejoras de accesibilidad.
- Mejor documentación en Storybook.
- Theming mediante variables CSS.
- Tests básicos de componentes.

## Entrega

- Sube tus cambios al repositorio o comparte un enlace con tu solución.
- Incluye una breve explicación:
  - decisiones técnicas
  - tradeoffs
  - qué mejorarías con más tiempo

## Nota para evaluación

La estructura actual está pensada para que la landing y la librería convivan en el mismo repo, pero separadas:

- `npm start` levanta una landing externa en Vite y recompila la librería de Stencil en paralelo.
- `npm run storybook` levanta Storybook y el entorno de desarrollo asociado para reflejar automáticamente cambios en componentes y estilos Shadow DOM.

---

## Solution Overview

He priorizado una aproximación `component-driven`: antes de completar la landing como una página aislada, he identificado las piezas reutilizables del diseño y las he construido como componentes de la librería, utilizando posteriormente la landing externa como un caso de uso real de consumo.

De este modo, la landing no actúa únicamente como una implementación visual concreta, sino también como una validación práctica de la reutilización, composición y flexibilidad de los componentes definidos dentro del sistema.

> [!NOTE]
> Parte de las decisiones documentadas en este README representan una dirección arquitectónica explorada durante la prueba y no necesariamente una implementación completamente desarrollada en esta iteración inicial.

La arquitectura separa:

- foundations reutilizables mediante Design Tokens,
- sistema de iconos,
- librería de componentes,
- documentación arquitectónica y
- landing consumidora.

---

## Setup

### Install

```bash
npm install
```

---

## Development Workflow

### Commands

| Command                 | Purpose                                      |
| ----------------------- | -------------------------------------------- |
| `npm run dev`           | Flujo completo: Stencil + Iconos + Storybook |
| `npm run dev:fresh`     | Limpieza total + flujo completo              |
| `npm run landing:dev`   | Ejecutar solo la landing page                |
| `npm run build`         | Build de producción de la librería           |
| `npm run icons:build`   | Generar/actualizar sprite de iconos          |
| `npm run storybook:dev` | Ejecutar solo Storybook                      |

---

#### Flujos de desarrollo disponibles y equivalencia comandos antiguos y actuales

- Starter original: `npm start`
- Flujo actual equivalente: `npm run landing:dev`
  - **Landing only**
  - Ejecuta la landing externa.
  - Disponible en:
    - [localhost:3333](http://localhost:3333)

- Starter original: `npm run storybook`
- Flujo actual equivalente: `npm run storybook:dev`
  - **Storybook only**
  - Ejecuta únicamente Storybook.
  - Pensado principalmente para revisar documentación y stories cuando la librería ya está compilada o el entorno principal de desarrollo está activo.
  - Disponible en:
    - [localhost:6006](http://localhost:6006)

- `npm run dev`
  - **Standard development**
  - Entorno completo de desarrollo del Design System:
    - Stencil en modo watch,
    - generación de iconos en modo watch,
    - y Storybook.
  - Disponible en:
    - [localhost:6006](http://localhost:6006)

- `npm run dev:fresh`
  - **Clean development start**
  - Limpieza total + entorno completo de desarrollo.

---

### ¿Por qué evolucionaron los scripts respecto al starter original?

> [!NOTE]
> Los cambios en los scripts y el workflow responden a necesidades reales derivadas de la evolución del proyecto hacia una arquitectura más desacoplada, distribuible y orientada a componentes reutilizables.

---

El proyecto partía de un starter básico de Stencil, donde los comandos principales (`npm start`, `npm run storybook`) lanzaban Stencil y la landing o Storybook en paralelo.

Ese flujo era adecuado para el alcance inicial del proyecto, pero a medida que el sistema evolucionó hacia una arquitectura más orientada a componentes reutilizables y a un Design System real, comenzaron a aparecer nuevos requisitos técnicos y de organización del workflow.

### Necesidades que surgieron durante la evolución del sistema

- **Sincronización de assets:**  
  Inicialmente, Stencil limpiaba `dist` durante determinados ciclos de build y watch, lo que generaba inconsistencias al servir los sprites SVG runtime desde esa misma carpeta.  
  Por este motivo, los assets de iconos se desacoplaron posteriormente del output de build de Stencil y pasaron a generarse y servirse desde `public/icons/`.

- **Pipeline de iconos:**  
  El sistema incorporó generación automática de:
  - sprite SVG runtime,
  - manifest JSON,
  - y typings TypeScript.

  El `icons.manifest.json` actúa como catálogo runtime de iconos disponibles y se utiliza para tooling, Storybook y generación automática de galerías.

  Los typings TypeScript (`icon-name.d.ts`) generan automáticamente una unión tipada con todos los nombres públicos de iconos, mejorando autocompletado, sincronización y DX.

  Todo esto requería una pipeline explícita y ordenada basada en:

  ```txt
  raw-icons → build pipeline → public/icons → runtime serving
  ```

- **Separación de flujos de desarrollo:**
  A medida que el proyecto creció, comenzaron a diferenciarse distintos contextos de trabajo:
  - desarrollo integrado,
  - Storybook aislado,
  - landing aislada,
  - y arranques limpios desde cero.

- **Mayor previsibilidad del entorno de desarrollo:**
  El sistema evolucionó hacia un flujo más explícito y determinista para reducir inconsistencias relacionadas con generación y serving de assets runtime `/icons/*`.

---

### Antes

```json
"start": "npm run build && concurrently -k -n STENCIL,SITE \"npm run dev:lib\" \"vite --config landing/vite.config.ts --host 0.0.0.0 --port 3333\"",
"storybook": "npm run build && concurrently -k -n STENCIL,SB \"npm run dev:lib\" \"storybook dev -p 6006\""
```

---

### Ahora

```json
"dev": "npm run dev:ordered",
"dev:ordered": "npm run build && concurrently -k -n STENCIL,ICONS,SB \"npm run dev:lib\" \"npm run icons:watch\" \"npm run storybook:dev\"",
"dev:fresh": "npm run dev:reset && npm run dev:ordered",
"landing:dev": "npm run icons:build && vite --config landing/vite.config.ts --host 0.0.0.0 --port 3333",
"storybook:dev": "storybook dev -p 6006 --no-open"
```

---

### Ventajas del nuevo enfoque

- El pipeline de iconos es más robusto y explícito.
- El arranque deja de depender únicamente de procesos paralelos y pasa a ser más determinista y predecible.
- Cada flujo tiene su comando específico, mejorando la Developer Experience y el onboarding.
- Se reducen inconsistencias relacionadas con sincronización y serving de assets runtime.
- El README y los scripts reflejan correctamente el contrato arquitectónico:

```txt
source → artifact → runtime
```

---

### Local URLs

#### Landing

```txt
http://localhost:3333
```

#### Storybook

```txt
http://localhost:6006
```

---

## Project Structure

```txt
src/
├── components/
├── foundations/
├── stylesheets/
└── types/

landing/
├── index.html
└── main.ts

.storybook/

public/
└── icons/
    ├── opo-sprite.svg
    ├── opo-sprite-ui.svg
    ├── opo-sprite-brand.svg
    ├── opo-sprite-brand-broken.svg
    ├── icons.manifest.json
    └── icon-name.d.ts

docs/
└── architecture/
```

---

> [!IMPORTANT]
>
> ## 🧩 Design System Approach
>
> Aunque creo que muchas de las decisiones presentes en la implementación original eran totalmente válidas para el alcance inicial de esta prueba técnica, he optado por aprovechar el ejercicio como una **oportunidad para explorar cómo podría evolucionar la arquitectura frontend** hacia un enfoque más _“design-system-oriented”_ en lugar de _“page-oriented”_, al considerar que este enfoque está más alineado con las responsabilidades asociadas a la posición.
>
> Dado que no parto de un sistema de diseño previamente definido ni de una arquitectura de tokens establecida desde diseño, muchas de las decisiones documentadas en este README han sido inferidas a partir de buenas prácticas utilizadas en sistemas de diseño modernos, priorizando aspectos como:
>
> - consistencia,
> - reutilización,
> - mantenibilidad,
> - escalabilidad,
> - accesibilidad,
> - y desacoplamiento entre diseño e implementación.
>
> Esto incluye decisiones relacionadas no solo con los design tokens, sino también con otros aspectos de la arquitectura frontend como:
>
> - resets CSS,
> - estructura de tokens,
> - nomenclatura,
> - tipografía,
> - estrategias tipográficas responsive,
> - estrategias de theming,
> - o adopción progresiva de características modernas de CSS.
>
> Al mismo tiempo, entiendo los **sistemas de diseño** no tanto como conjuntos rígidos de reglas cerradas, sino como **ecosistemas vivos sujetos a evolución** constante según las necesidades de producto, contexto de uso, accesibilidad, escalabilidad y colaboración entre equipos. Desde esta perspectiva, aunque muchas de las decisiones documentadas en este README parten de patrones y aproximaciones ampliamente adoptadas en arquitecturas frontend actuales, también han sido interpretadas y adaptadas desde mi propia experiencia, criterio técnico y comprensión del contexto concreto de la prueba, **evitando aplicar soluciones de forma dogmática** o descontextualizada.
>
> Por otro lado, entiendo estas decisiones como parte de un **proceso colaborativo y transversal** entre diseño, desarrollo, producto... En un entorno real, cualquier evolución del sistema debería idealmente consensuarse con los equipos implicados para garantizar coherencia tanto visual como técnica a largo plazo.
>
> También soy consciente de que parte del nivel de abstracción y profundidad arquitectónica explorado en este README excede probablemente las necesidades estrictamente necesarias para el alcance actual de la prueba. Sin embargo, he preferido abordarlo como un ejercicio de exploración técnica orientado a reflejar mejor mi aproximación habitual al desarrollo de sistemas frontend y librerías de componentes reutilizables.
>
> En definitiva, las decisiones documentadas en este README no pretenden cuestionar la aproximación original, sino explorar una posible dirección de evolución arquitectónica del sistema tomando esta propuesta de landing page como punto de partida.

---

## Component Architecture

### Landing Integration

Cómo se ha separado la librería y la landing.

<!-- TO DO -->

---

## CSS Reset

Dado que este proyecto parte de una base limpia, he añadido un reset ligero inspirado en [Josh Comeau's reset](https://www.joshwcomeau.com/css/custom-css-reset/) con el objetivo de establecer comportamientos base más predecibles y accesibles entre navegadores, sin imponer decisiones visuales o estéticas.

Este reset proporciona una base más consistente para la librería de componentes y adopta mejoras progresivas mediante características modernas de CSS (ej: `text-wrap: balance;` `interpolate-size: allow-keywords;`)

---

## Design Tokens

El sistema de tokens sigue una arquitectura en capas:

```txt
reference → system → (component)
```

con separación entre:

- valores primitivos,
- decisiones semánticas,
- y adaptación específica de componentes.

Más detalles:

- [Design Tokens](./docs/architecture/design-tokens.md)

---

## Icon System

El sistema de iconos utiliza:

- SVG sprites,
- manifest generado,
- typings automáticos,
- y runtime serving desacoplado.

La pipeline de iconos separa deliberadamente los assets preparados para runtime (`ui`, `brand`) de los assets raw utilizados únicamente para demos y debugging (`brand-broken`).

Solo los iconos validados de runtime se exponen mediante:

- `opo-sprite.svg`
- `icons.manifest.json`
- `icon-name.d.ts`

Arquitectura general:

```txt
raw-icons → validation/optimization → public/icons → runtime serving
```

Más detalles:

- [Icon System](./docs/architecture/icon-system.md)

## Storybook

Storybook se utiliza como:

- entorno de documentación,
- validación visual,
- aislamiento de componentes,
- y playground para variantes y estados.

El sistema de iconos y los assets SVG se sirven desde:

```txt
/icons/*
```

mediante runtime assets generados en:

```txt
public/icons/
```

La API runtime de iconos consume el sprite combinado `opo-sprite.svg`, mientras que los sprites adicionales (`opo-sprite-ui.svg`, `opo-sprite-brand.svg`, `opo-sprite-brand-broken.svg`) permanecen disponibles para debugging y documentación visual en Storybook.

---

## Calidad y Tooling

- **Storybook** como entorno de documentación y desarrollo aislado de componentes.
- Browser component testing en navegador real mediante **Playwright** + **Vitest Browser Mode**.
- APIs de componentes orientadas a **accesibilidad**.
- Pipeline SVG con validación, optimización y generación automática de **sprites**, manifest y typings.
- Arquitectura semántica de **Design Tokens**.

> [!NOTE]
>
> ## Recarga fiable de componentes Stencil en Storybook
>
> Durante el desarrollo de Web Components con `Stencil`, los cambios en componentes o estilos Shadow DOM no siempre se reflejan correctamente en Storybook debido a la **caché de módulos de `Vite` y la persistencia de custom elements** ya definidos en runtime.

> Para evitar estos problemas, se ha incorporado un plugin custom de Vite (`stencil-components-full-reload`) dentro de la configuración de Storybook.

- invalida automáticamente los módulos generados por Stencil (`loader` y bundles compilados en `dist`),
- y fuerza un full reload del preview de Storybook **cuando cambian componentes o estilos**.

Esto evita problemas habituales de caché entre `Stencil`, `Vite` y `Storybook` durante workflows basados en:

```txt
stencil build --watch
```

especialmente al trabajar con:

- Web Components,
- estilos encapsulados mediante Shadow DOM,
- loaders generados por Stencil,
- y bundles runtime servidos desde `dist`.

### ¿Dónde se implementa?

Este comportamiento está configurado en:

```txt
.storybook/main.ts
```

dentro de:

```ts
viteFinal();
```

mediante un plugin Vite personalizado.

---

Más detalles sobre foundations y decisiones arquitectónicas:

## Architecture Documentation

- [Design Tokens](./docs/architecture/design-tokens.md)
- [Typography](./docs/architecture/typography.md)
- [Responsive Strategy](./docs/architecture/responsive.md)
- [Icon System](./docs/architecture/icon-system.md)
- [Layering & Motion](./docs/architecture/layering-and-motion.md)
- [Accessibility](./docs/architecture/accessibility.md)
- [Testing](./docs/architecture/testing.md)

---

> [!NOTE]
> **Nota sobre documentación:**
>
> - Los `README.md` de componentes generados por Stencil se usan como referencia técnica automática.
> - La documentación principal de uso y ejemplos vive en Storybook MDX (por ejemplo `src/components/opo-icon/opo-icon.mdx`).
> - Las decisiones de arquitectura se documentan en `docs/architecture/` (por ejemplo `docs/architecture/icon-system.md`).

---

## Tradeoffs

Dado el alcance de la prueba, algunas decisiones se han simplificado deliberadamente para priorizar claridad arquitectónica y la construcción de una base sólida, coherente y mantenible frente a una implementación excesivamente compleja.

Se ha evitado introducir:

- abstracciones prematuras,
- granularidad excesiva,
- o complejidad innecesaria.

Por ejemplo:

- La **escala de tokens** se ha mantenido deliberadamente contenida para evitar introducir granularidad y complejidad innecesarias de forma prematura (ej: `containers`, `shadows`, `font-family`).
- Algunas aproximaciones modernas como `container queries` o `fluid typography` se han aplicado de forma selectiva, evitando extenderlas indiscriminadamente a todo el sistema.
- Se valoró el uso de `@scope` para encapsular determinados estilos de composición de la landing, pero se priorizó una arquitectura más simple basada en cascade layers (`@layer`), estilos encapsulados por componente en Stencil y CSS custom properties para theming.
- Aunque inicialmente se valoró incorporar fallbacks adicionales de compatibilidad `@supports` para determinadas características modernas de CSS como `oklch()`, finalmente se optó por priorizar una implementación más simple y alineada con el soporte actual de navegadores modernos ([OKLCH support](https://caniuse.com/?search=oklch)).
  Considero que el soporte actual de `oklch()` en navegadores modernos resulta **suficientemente sólido** como para incorporarlo progresivamente en sistemas frontend contemporáneos, especialmente en entornos donde no existen fuertes requisitos de compatibilidad legacy.

---

## Future Improvements

En un contexto real de evolución del sistema, algunos aspectos que podrían desarrollarse más adelante serían:

- Estrategia completa de theming (`light/dark mode`).
- Multi-brand support mediante `brand themes`.
- Estrategias de internacionalización (`i18n`).
- Mayor adopción progresiva de `container queries`.
- Estrategias avanzadas de motion.

- Evolución hacia pipelines automatizados de design tokens con herramientas como [Style Dictionary](https://styledictionary.com/) en escenarios multi-brand o multi-platform.

- Auditorías de accesibilidad ([axe-core](https://www.deque.com/axe/)) y performance más exhaustivas ([WebPageTest](https://www.webpagetest.org/)).
- Integración progresiva de visual regression testing ([Chromatic](https://www.chromatic.com/)).
- Integración de end-to-end testing ([Playwright](https://playwright.dev/)).
- Automatización de análisis estático y métricas de calidad mediante herramientas como [SonarQube](https://www.sonarsource.com/es/products/sonarqube/).
- Integración de herramientas de monitoring y runtime error tracking mediante plataformas como [Sentry](https://sentry.io/).

- Migrar de `npm` a [`pnpm@^11`](https://pnpm.io/) para obtener una **gestión de dependencias más segura** (resolución estricta, prevención de dependencias fantasma y lockfile más robusto), junto con instalaciones más rápidas y menor consumo de disco.

---
