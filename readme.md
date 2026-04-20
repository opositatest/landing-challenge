# Entrega — Stencil Landing Challenge

[Demo en producción](https://test-one-black-13.vercel.app/)

## Decisiones técnicas

- **Shadow DOM por componente** para aislar estilos.
- **Accesibilidad como requisito, no extra.** Uso consistente de `sr-only`, `aria-labelledby`, `aria-hidden` y gestión explícita del foco — por ejemplo, en `opo-video` el `<iframe>` recibe foco al pulsar play para que el lector de pantalla anuncie el `title`.
- **Rendimiento en la build de la landing.** Plugin Vite propio (`landing/vite.config.ts`) que, en tiempo de build:
  - Inyecta `<link rel="preload" as="font">` para las `.woff2` hasheadas.
  - Inyecta en línea el CSS final dentro del `<head>` para eliminar el request render-blocking.
- **Tipografías subsetadas** con `unicode-range` y `font-display: swap` para reducir el peso y evitar FOIT.

## Tradeoffs

- `opo-icon`: Se buscan los iconos por clave (`icons[name]`), lo que impide el tree-shaking. El chunk de iconos pesa ~300KB raw (~115KB gzip) aunque la landing use solo una parte. Decidí dejarlo así porque las rutas en Storybook del asset generaba problemas. Con más tiempo buscaría una solución adecuada.
- **CSS totalmente en línea.** Gana en renderizado (sin request bloqueante) pero pierde cacheado. Es el tradeoff correcto para una landing de una sola página.
- **Preload de todas las fuentes.** Las cuatro variantes están above the fold según Lighthouse, así que las precargo todas.
- **`font-display: swap`** asume que un breve FOUT es preferible a texto invisible — decisión consciente para priorizar LCP.

## Accesibilidad

- El sitio ha sido testado con los lectores de pantalla NVDA, JAWS y TalkBack. Siendo este completamente navegable por los mismos junto al uso de teclado.
- Se ha hecho uso de la extensión de Axe para Chrome para el análisis estático.
- Se ha comprobado el funcionamiento del sitio acorde a la regla [reflow](https://www.w3.org/WAI/WCAG21/Understanding/reflow.html).
- Se hace uso de la media query `prefers-reduced-motion` para eliminar transiciones que puedan ocasionar problemas a usuarios con sensibilidad motora.

## Qué mejoraría con más tiempo

- **SVG `opo-icon`**: Es la mayor oportunidad de mejora de rendimiento que queda.
- **Crear más componentes** acorde a las necesidades.
- **Arquitectura CSS**: aplicar una arquitectura, crear custom properties agnósticas, usando nuevas y soportadas funcionalidades como uso de `OKLCH()`, `clamp()` para reducir media queries, uso de container queries, `@layer` etc.
- **Auditoría Lighthouse en CI** para detectar regresiones de performance en PRs.
- **Añadir tests de accesibilidad automatizados**.
- Reunirme con diseño para establecer soluciones a problemas, retos o inconsistencias encontradas a nivel layout y de accesibilidad.
- Comprobar el sitio usando VoiceOver en macOS e iOS.
