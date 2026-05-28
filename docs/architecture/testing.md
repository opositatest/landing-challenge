# Testing Strategy

---

## Overview

La estrategia de testing del sistema se plantea desde el comportamiento observable de los componentes, evitando validar detalles internos de implementación siempre que sea posible.

El objetivo es crear tests resilientes a refactors internos y cercanos al comportamiento real percibido por usuarios, navegadores y tecnologías asistivas.

Actualmente el proyecto utiliza Vitest como framework principal de testing, con soporte específico para Stencil, Browser Mode mediante Playwright y una integración inicial con Storybook principalmente orientada a documentación, accesibilidad manual/asistida y playground visual.

El uso de Browser Mode permite validar componentes en un entorno más cercano al navegador real que los entornos puramente simulados mediante JSDOM.

---

## Testing stack

Las principales herramientas instaladas son:

- `vitest`: framework principal de testing.
- `@stencil/vitest`: integración de Stencil con Vitest.
- `@vitest/browser-playwright`: ejecución de component tests en navegador real mediante Playwright.
- `@vitest/ui`: interfaz visual de Vitest.
- `@storybook/addon-vitest`: integración entre Storybook y Vitest.
- `@storybook/addon-a11y`: soporte de revisión de accesibilidad en Storybook.
- `jsdom`: entorno DOM para determinados tests.
- `@storybook/web-components-vite`: soporte de Storybook para Web Components con Vite.

---

## Scripts de testing disponibles

Los scripts principales de testing son:

```bash
npm test
```

Ejecuta Vitest.

```bash
npm run test:watch
```

Ejecuta Vitest en modo watch.

```bash
npm run test:ui
```

Abre la interfaz visual de Vitest.

---

## Comandos recomendados

Para ejecutar todos los tests:

```bash
npm test
```

Para ejecutar solo los component tests de navegador:

```bash
npx vitest --project browser
```

Para ejecutar solo un test concreto de componente:

```bash
npx vitest --project browser src/components/opo-icon/opo-icon.cmp.test.tsx
```

Para abrir la UI de Vitest solo con los browser tests:

```bash
npx vitest --ui --project browser
```

Para abrir la UI de Vitest con un único archivo:

```bash
npx vitest --ui --project browser src/components/opo-icon/opo-icon.cmp.test.tsx
```

---

## Convenciones de nomenclatura de archivos

El proyecto utiliza actualmente las siguientes convenciones:

| Tipo de test            | Patrón            |
| ----------------------- | ----------------- |
| Unit tests              | `*.unit.test.tsx` |
| Browser component tests | `*.cmp.test.tsx`  |
| Storybook stories       | `*.stories.ts`    |

La separación permite diferenciar claramente:

- tests de lógica aislada,
- tests de componentes renderizados en navegador,
- y documentación interactiva mediante Storybook.

---

## Proyectos de testing

La configuración actual separa los tests en dos proyectos activos:

### Tests unitarios

Pensados para lógica aislada, helpers o funciones puras.

Patrón de archivos:

`src/**/*.unit.test.{ts,tsx}`

### Browser component tests

Pensados para validar componentes renderizados en navegador real mediante Playwright.

Patrón de archivos:

`src/**/*.cmp.test.{ts,tsx}`

> [!NOTE]
> Las stories de Storybook (\*.stories.ts) se utilizan actualmente como documentación interactiva y playground visual, no como suites de test ejecutadas por Vitest.

> Aunque el proyecto tiene instalada la integración @storybook/addon-vitest, los tests basados en stories quedan fuera del flujo principal por ahora. Podrían incorporarse más adelante mediante play() functions e interaction testing.

---

## Filosofía de component testing

Los component tests deberían validar principalmente:

- renderizado esperado,
- contrato público de props,
- accesibilidad básica,
- clases y estados públicos,
- slots,
- shadow parts públicos,
- edge cases relevantes.

No deberían centrarse en detalles internos como:

- métodos privados,
- estructura interna excesivamente específica,
- snapshots grandes,
- valores exactos de CSS,
- implementación concreta de helpers internos.

Muchos componentes utilizan Shadow DOM mediante Stencil.

Por este motivo, algunos tests interactúan explícitamente con `shadowRoot` para validar renderizado interno, slots, accessibility semantics y shadow parts expuestos públicamente.

---

## Testing orientado a accesibilidad

La accesibilidad se considera parte del comportamiento esperado del componente.

Los tests deberían cubrir, cuando aplique:

- roles accesibles,
- `aria-label`,
- `aria-hidden`,
- nombres accesibles,
- estados interactivos,
- foco,
- navegación mediante teclado,
- atributos ARIA necesarios.

---

## Notas sobre Browser Mode y Playwright

Los browser component tests utilizan actualmente Playwright con Chromium como navegador de referencia durante desarrollo.

La arquitectura de componentes está pensada para funcionar correctamente en navegadores modernos compatibles con Web Components y Shadow DOM.

Si Chromium no está instalado localmente:

```bash
npx playwright install chromium
```

---

## Storybook + Stencil Hot Reload considerations

Durante el desarrollo se detectó que, aunque Stencil recompila correctamente componentes y estilos encapsulados (`Shadow DOM`) mediante:

```bash
stencil build --watch
```

Storybook/Vite puede mantener en caché módulos relacionados con el loader y los bundles generados por Stencil.

Esto puede provocar que cambios en archivos `.tsx` o `.css` no se reflejen automáticamente en Storybook, incluso cuando Stencil ya ha recompilado correctamente el componente.

Para mejorar la experiencia de desarrollo, la configuración de Storybook incorpora actualmente:

- invalidación explícita de módulos relacionados con `loader/` y `dist/`,
- y un full reload automático cuando cambian archivos dentro de `src/components`.

Esta estrategia permite reflejar correctamente cambios en componentes Web Components y estilos Shadow DOM durante desarrollo sin necesidad de reiniciar manualmente Storybook.

Esta lógica se implementa actualmente mediante un plugin Vite definido dentro de `.storybook/main.ts`.

---

## Screenshots and artifacts (archivos auxiliares)

Vitest Browser / Playwright puede generar artifacts locales como:

```text
.vitest-attachments/
__screenshots__/
```

Mientras no exista una estrategia formal de visual regression testing, estos archivos deben tratarse como artifacts temporales y no versionarse.

---

## Posibles mejoras futuras

Posibles evoluciones futuras:

- integrar `axe-core` para validación automatizada de accesibilidad,
- ampliar component tests en más componentes,
- añadir tests de interacción para componentes interactivos,
- formalizar coverage,
- valorar visual regression testing con Chromatic, Percy, Playwright o Vitest snapshots,
- incorporar progresivamente interaction testing basado en Storybook mediante `play()` functions,
- definir convenciones comunes para nombres de tests y estructura de archivos.
