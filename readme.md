# Lit Landing Challenge

Starter para una prueba técnica centrada en `Lit`, `Web Components` y `Storybook`.

La base está preparada para que la persona candidata clone el repo, instale dependencias y empiece a trabajar sin perder tiempo en setup. El starter incluye un único componente de ejemplo, `opo-button`, y una landing externa separada de la librería.

## Setup

```bash
npm install
npm start
```

Landing local:

`http://localhost:3333`

Storybook:

```bash
npm run storybook
```

Storybook local:

`http://localhost:6006`

## Objetivo de la prueba

Construir una landing page usando `Lit` y documentar los componentes en `Storybook`.

La idea es que la pagina viva fuera de la librería de componentes, como ocurriría en una web consumidora del paquete.

## Donde trabajar

Componente base:

`src/components/opo-button/`

Landing principal:

`landing/`

Historias de Storybook:

`src/components/**/*.stories.ts`

Estilos globales:

`src/global/global.css`

## Lo que ya viene hecho

- Entorno base de Lit listo para arrancar.
- Landing externa inicial en `landing/`.
- Un único componente de ejemplo: `opo-button`.
- Storybook configurado para documentar componentes de la librería.

El resto de componentes debe decidirlo y construirlo la persona candidata.

## Como consume la landing la librería

La landing no importa componentes uno a uno ni requiere tocar `package.json` cada vez que se añade uno nuevo.

La web externa carga directamente el entry principal de la librería desde:

`landing/main.ts`

Ese entry registra automáticamente los Web Components, así que cualquier componente nuevo que se cree en `src/components/` pasa a estar disponible en la landing en cuanto se importe desde `src/index.ts`.

## Requisitos esperados

- Usar `Lit` para construir componentes reutilizables.
- Montar la landing desde la web externa, no desde un componente contenedor dentro de la librería.
- Documentar en Storybook los componentes.
- Organizar la solución con una jerarquía de componentes clara.

## Se valorara especialmente

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

- `npm start` levanta la landing externa con Vite.
- `npm run storybook` levanta Storybook consumiendo los componentes Lit directamente desde `src/`.
