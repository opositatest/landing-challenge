# Icon System

---

## Overview

El sistema de iconos se ha planteado como una arquitectura reutilizable orientada a componentes, donde los SVG originales pasan por una pipeline de optimización, validación y compilación antes de ser consumidos por el componente `opo-icon`.

La estrategia general se basa en:

```txt
raw-icons → build pipeline → public/icons → runtime serving
```

Esto permite:

- mantener una única fuente de verdad para los SVG originales,
- desacoplar el runtime de los assets fuente,
- generar automáticamente sprites SVG, manifest y typings,
- y distribuir el sistema de iconos como parte de la librería de componentes.

---

## Contexto y problemas detectados

Los SVG originales proporcionados desde Figma seguían una estrategia de exportación válida para diseño visual, aunque presentaban varias inconsistencias habituales al integrarlos dentro de un sistema de iconografía reutilizable.

Algunos de los problemas detectados fueron:

- `viewBox` y tamaños inconsistentes (`16x18`, `20x38`, `32x31`, etc.).
- Colores hardcodeados en iconos de interfaz.
- Metadata y atributos generados automáticamente (`id`, grupos redundantes, transforms, etc.).
- Diferencias estructurales importantes entre iconos UI y assets de marca.
- Proporciones y áreas visuales poco consistentes respecto a una grid común.
- Exportaciones heterogéneas según el tipo de asset o herramienta utilizada.

Estos aspectos no impedían el renderizado de los iconos, pero sí dificultaban:

- consistencia visual,
- theming,
- integración segura en sprites,
- reutilización escalable,
- y mantenibilidad del sistema.

Por este motivo se definió una pipeline diferenciada de optimización, validación y compilación.

---

## Flujo de iconos

### Comandos recomendados

El sistema de iconos utiliza varios scripts npm para gestionar, optimizar y construir los recursos SVG.

```bash
npm run icons:format
```

Formatea los SVG originales dentro de `raw-icons` utilizando `xmllint`.

```bash
npm run icons:optimize
```

Ejecuta la optimización de los SVG de `ui` y `brand` usando SVGO, con reglas diferenciadas según el tipo de icono.

```bash
npm run icons:build
```

Genera los sprites SVG, el manifest JSON y los typings TypeScript a partir de los SVG optimizados.

```bash
npm run icons:watch
```

Reconstruye automáticamente los artefactos de iconos cada vez que se detectan cambios en los SVG dentro de `raw-icons`.

> [!TIP]
> En el flujo habitual de trabajo normalmente basta con ejecutar:
>
> ```bash
> npm run icons:optimize
> npm run icons:build
> ```
>
> `icons:optimize` ejecuta automáticamente el formateo y la optimización de los SVG de `ui` y `brand`, por lo que no suele ser necesario lanzar `icons:format` manualmente salvo que únicamente se quiera reformatear los archivos sin optimizarlos.

---

### Resumen de scripts

- `icons:format`: formatea todos los SVG en `raw-icons`.
- `icons:optimize:ui`: optimiza los SVG de `raw-icons/ui` usando `svgo.config.ui.js`.
- `icons:optimize:brand`: optimiza los SVG de `raw-icons/brand` usando `svgo.config.brand.js`.
- `icons:optimize`: ejecuta formateo + optimización UI + optimización Brand.
- `icons:build`: genera sprites, manifest y typings.
- `icons:watch`: ejecuta una build inicial y reconstruye automáticamente al detectar cambios.

---

### Artefactos generados

Durante `icons:build` se generan automáticamente:

```txt
public/icons/
├── opo-sprite.svg
├── opo-sprite-ui.svg
├── opo-sprite-brand.svg
├── opo-sprite-brand-broken.svg
├── icons.manifest.json
└── icon-name.d.ts
```

Estos archivos representan los artefactos generados por la pipeline de iconos.

- `opo-sprite.svg` es el sprite combinado de runtime consumido por `opo-icon`.
- `opo-sprite-ui.svg` y `opo-sprite-brand.svg` se mantienen como artefactos separados útiles para documentación, debugging o demos.
- `opo-sprite-brand-broken.svg` se mantiene exclusivamente para demos/debug de assets raw no sanitizados.
- `icons.manifest.json` e `icon-name.d.ts` exponen únicamente iconos válidos de runtime (`ui` + `brand`).

Los archivos dentro de `public/icons` no deben editarse manualmente.

---

## Arquitectura general

```bash
src/components/opo-icon/
├── raw-icons/
│   ├── ui/                ← Iconos de interfaz (outline)
│   ├── brand/             ← Logos, redes sociales y pictogramas validados
│   └── brand-broken/      ← Assets raw no sanitizados para demo/debug
│
public/icons/
├── opo-sprite.svg
├── opo-sprite-ui.svg
├── opo-sprite-brand.svg
├── opo-sprite-brand-broken.svg
├── icons.manifest.json
└── icon-name.d.ts
```

---

### Source Layer

```txt
raw-icons/
```

Contiene los SVG originales y representa la única fuente editable del sistema.

- `ui/` → iconos de interfaz reutilizables.
- `brand/` → logos, pictogramas y assets de marca validados para runtime.
- `brand-broken/` → assets raw no sanitizados usados únicamente para demos/debug.

Los archivos dentro de `raw-icons` nunca se sirven directamente al navegador.

---

### Build Artifacts

```txt
public/icons/
```

Se generan automáticamente durante `icons:build`.

Estos artefactos incluyen:

- sprites SVG compilados,
- manifest JSON,
- typings TypeScript,
- y assets distribuibles para runtime.

---

### Runtime vs Demo Assets

La pipeline separa deliberadamente los assets preparados para producción de los assets raw usados únicamente para documentación, demos o debugging.

#### Runtime assets

Los iconos de `ui` y `brand` son los únicos que forman parte de la API pública de runtime.

Estos iconos:

- se validan según las reglas de su categoría,
- se optimizan con la configuración SVGO correspondiente,
- se incluyen en el sprite combinado `opo-sprite.svg`,
- se exponen en `icons.manifest.json`,
- y se incluyen en los typings generados `icon-name.d.ts`.

#### Demo/debug assets

Los iconos de `brand-broken` representan assets raw no sanitizados.

Estos iconos:

- no se incluyen en `opo-sprite.svg`,
- no aparecen en `icons.manifest.json`,
- no forman parte de `icon-name.d.ts`,
- y no deberían consumirse desde `opo-icon` en runtime.

Se mantienen únicamente en `opo-sprite-brand-broken.svg` para poder documentar o comparar visualmente assets problemáticos dentro de Storybook sin contaminar la API pública del sistema.

---

### Runtime Layer

El componente `opo-icon` consume el sprite combinado de runtime servido desde:

```txt
/icons/opo-sprite.svg
```

Ejemplo:

```html
<use href="/icons/opo-sprite.svg#opo-icon-check"></use>
```

Esto permite que la API pública del componente pueda resolver iconos de `ui` y `brand` mediante un único sprite estable, sin exponer assets raw de demo/debug.

Esto desacopla completamente el componente de:

- Storybook,
- Vite,
- Stencil,
- y la estructura interna del repositorio.

---

## Estrategia Runtime basada en Sprite

Todos los iconos se renderizan mediante un modelo basado en:

```txt
<symbol> + <use>
```

Durante la build:

1. Los SVG originales se transforman en símbolos SVG (`<symbol>`).
2. Cada símbolo recibe un ID único.
3. Los sprites finales se generan dentro de `public/icons`.
4. El componente `opo-icon` consume los símbolos mediante `<use>`.

---

### ¿Por qué usar sprites SVG?

Aunque técnicamente sería posible renderizar cada SVG como un asset independiente o inline, el modelo sprite aporta varias ventajas arquitectónicas:

- consistencia visual,
- desacoplamiento runtime,
- reducción de requests independientes,
- herencia visual mediante CSS,
- compatibilidad con distribución externa,
- y una API de componente más estable.

---

### Consideraciones sobre Shadow DOM

El componente `opo-icon` utiliza:

```ts
shadow: true;
```

Por este motivo, el sistema no depende de símbolos inline dentro del documento principal:

```html
<use href="#icon-id"></use>
```

En su lugar, consume un sprite SVG externo mediante URL absoluta:

```html
<use href="/icons/opo-sprite.svg#opo-icon-check"></use>
```

Esto garantiza compatibilidad con:

- Shadow DOM,
- Storybook,
- SSR,
- aplicaciones consumidoras externas,
- y posibles escenarios de distribución mediante CDN.

---

### Runtime Asset Serving

Storybook expone:

```txt
public/icons
```

como:

```txt
/icons
```

mediante `staticDirs`.

Esto permite que:

```html
<use href="/icons/opo-sprite.svg#opo-icon-check"></use>
```

funcione correctamente tanto en Storybook como en aplicaciones consumidoras externas.

Los sprites separados (`opo-sprite-ui.svg`, `opo-sprite-brand.svg` y `opo-sprite-brand-broken.svg`) pueden seguir usándose para documentación, demos o inspección visual, pero el componente `opo-icon` debería consumir el sprite combinado `opo-sprite.svg` como fuente runtime principal.

---

## Optimización y normalización SVG

La estrategia de optimización diferencia explícitamente entre iconos de interfaz e iconos de marca.

```txt
UI icons → system assets
Brand icons → identity assets
Brand broken icons → raw demo/debug assets
```

Esta distinción evita aplicar las mismas reglas de normalización a assets que cumplen funciones visuales distintas dentro del sistema.

---

### Arquitectura de configuración SVGO

La optimización SVG se basa en una configuración parametrizable compartida:

```txt
svgo.config.base.js
```

que actúa como configuración base reutilizable para distintos tipos de iconos.

A partir de esta configuración común se construyen:

- `svgo.config.ui.js`
- `svgo.config.brand.js`

permitiendo aplicar reglas específicas según el tipo de asset sin duplicar toda la configuración de SVGO.

Esto facilita mantener una estrategia coherente de optimización mientras se preservan diferencias importantes entre iconos UI y Brand.

---

### UI Icons: System Assets

Los iconos UI forman parte de la gramática visual del sistema.

Por este motivo siguen una estrategia de normalización más estricta orientada a:

- consistencia visual,
- `currentColor`,
- previsibilidad,
- theming,
- reutilización,
- y comportamiento homogéneo dentro de componentes.

La intención es que los iconos UI se comporten como assets del sistema: limpios, predecibles y fácilmente integrables en cualquier contexto de interfaz.

---

### Brand Icons: Identity Assets

Los iconos Brand representan logos, pictogramas o assets con identidad visual propia.

Por este motivo siguen una estrategia de sanitización más conservadora orientada a:

- preservar estructura e identidad visual,
- mantener proporciones y `viewBox`,
- respetar detalles visuales específicos,
- evitar optimizaciones destructivas,
- y permitir normalización controlada de ciertos colores cuando resulta necesario para integración runtime mediante `currentColor`.

En estos casos, la fidelidad visual del asset tiene prioridad frente a la normalización agresiva.

---

### Brand Broken Icons: Demo / Debug Assets

Los iconos `brand-broken` se mantienen como assets raw no sanitizados para documentación, comparación visual o demos internas.

Esta categoría existe para poder mostrar iconos problemáticos sin incorporarlos al runtime real del sistema.

Por este motivo:

- no forman parte del sprite combinado `opo-sprite.svg`,
- no se incluyen en `icons.manifest.json`,
- no generan typings públicos,
- y no deberían utilizarse como nombres válidos en `opo-icon`.

Si un icono de `brand-broken` pasa a ser necesario en producción, debe migrarse a `raw-icons/brand`, adoptar el prefijo `brand-` y cumplir la validación mínima de iconos Brand.

---

### Explicación de optimizaciones SVG

La pipeline utiliza SVGO para limpiar y optimizar los SVG antes de generar los sprites. Algunas optimizaciones son seguras para todos los iconos, mientras que otras se aplican o desactivan según el tipo de asset.

- `removeDimensions`  
  Elimina `width` y `height` del `<svg>` raíz para que el tamaño final pueda controlarse desde CSS sin alterar el `viewBox`.

- safe `removeAttrs`  
  Elimina metadata innecesaria, como `data-name`, `data-testid` o `aria-hidden`, pero conserva atributos críticos como `id` para no romper referencias internas.

- `removeStyleElement`  
  Elimina bloques `<style>`. Es útil para iconos UI, pero no se aplica a Brand porque algunos assets pueden depender de estilos internos exportados desde diseño.

- `removeScripts`  
  Elimina cualquier contenido ejecutable dentro del SVG.

- `removeComments`  
  Elimina comentarios para reducir ruido y tamaño del asset final.

- `removeUselessDefs`  
  Elimina definiciones que SVGO considera innecesarias. Es útil para iconos UI simples, pero se desactiva en Brand para evitar eliminar `<defs>` necesarios para máscaras, gradientes o filtros.

- `sortAttrs`  
  Ordena atributos de forma consistente, mejorando legibilidad y estabilidad en diffs.

- `convertPathData`  
  Optimiza coordenadas y datos de paths intentando mantener el resultado visual.

- `cleanupIds`  
  Minifica o limpia IDs internos. En Brand se desactiva para preservar referencias como `mask`, `clipPath`, `filter` o `url(#id)` dentro del sprite.

- `collapseGroups`, `mergePaths` y `convertShapeToPath`  
  Simplifican estructura SVG. En Brand se desactivan porque pueden alterar assets complejos exportados desde diseño.

- `convertColors`  
  Normaliza valores de color. En Brand se desactiva para evitar modificaciones automáticas no deseadas; cualquier normalización cromática se aplica de forma controlada desde la pipeline.

---

### Reglas compartidas de optimización

Ambos tipos de iconos comparten ciertas optimizaciones seguras:

- `removeDimensions`
- safe `removeAttrs`
- `removeScripts`
- `removeComments`
- `sortAttrs`
- `convertPathData`

Estas reglas reducen ruido y tamaño sin alterar la estructura esencial del SVG ni romper su capacidad de escalar mediante CSS.

---

### Reglas de optimización para UI Icons

Los iconos UI aplican una estrategia más estricta:

- `removeDimensions`
- safe `removeAttrs`
- `removeStyleElement`
- `removeScripts`
- `removeComments`
- `removeUselessDefs`
- `sortAttrs`
- `convertPathData`

Además, los iconos UI deberían cumplir reglas como:

- `viewBox` consistente, normalmente `0 0 24 24`,
- uso de `currentColor`,
- ausencia de colores hardcodeados,
- ausencia de estilos inline,
- y estructura SVG predecible.

> [!NOTE]
> La normalización de `viewBox` y `currentColor` no debería asumirse como una transformación automática destructiva. Es preferible validarla y fallar explícitamente si un icono UI no cumple las reglas esperadas.

---

### Reglas de optimización para Brand Icons

Los iconos Brand aplican una estrategia conservadora:

- `removeDimensions`
- safe `removeAttrs`
- `removeScripts`
- `removeComments`
- `sortAttrs`
- `convertPathData`
- `cleanupIds: false`
- `removeUselessDefs: false`
- `collapseGroups: false`
- `mergePaths: false`
- `convertShapeToPath: false`
- `convertColors: false`
- no `removeStyleElement`
- no aggressive `fill` / `stroke` normalization
- no automatic `viewBox` normalization

La intención es optimizar sin destruir información visual propia del asset de marca. Por eso se preservan referencias SVG internas como:

- `mask`
- `clipPath`
- `filter`
- `defs`
- y referencias `url(#id)`

Esto evita que optimizaciones agresivas rompan el renderizado de assets Brand complejos dentro del sprite runtime.

---

### Reglas de validación

Durante la build se validan automáticamente distintos aspectos del sistema SVG.

Entre ellos:

- nombres duplicados,
- colisiones de IDs,
- iconos vacíos,
- estructuras SVG inválidas,
- y reglas específicas según el tipo de icono (`ui` o `brand`).

La pipeline sigue una estrategia:

```txt
fail-fast
```

Si un asset incumple las reglas definidas, el build falla explícitamente.

En el caso de los iconos UI, algunas reglas se validan explícitamente durante la build.

Por ejemplo:

- el `viewBox` debe existir y utilizar la grid estándar del sistema:

```svg
viewBox="0 0 24 24"
```

- los atributos `fill` y `stroke` no deben contener colores hardcodeados y deberían utilizar valores compatibles con la estrategia visual del sistema, como:

```svg
stroke="currentColor"
fill="none"
```

Actualmente esta validación se implementa mediante:

```txt
validateLineIcon()
```

dentro de:

```txt
generate-icon-sprite.js
```

> [!NOTE]
> Algunas reglas, como `currentColor`, `viewBox` consistente o ausencia de colores hardcodeados, aplican principalmente a iconos UI. Los iconos Brand pueden conservar colores, proporciones o estructuras propias cuando forman parte de su identidad visual.

---

## API pública y nomenclatura

### Public API vs Internal IDs

El sistema distingue entre:

#### Public API

```html
<opo-icon name="check"></opo-icon>
```

#### Internal Symbol IDs

```txt
opo-icon-check
```

Los prefijos internos (`ui-`, `brand-`, `opo-icon-`) no forman parte de la API pública.

---

### Compatibilidad legacy

El componente mantiene compatibilidad temporal con nombres legacy:

```txt
ui-check
opo-icon-check
```

normalizándolos automáticamente a:

```txt
check
```

y mostrando warnings únicamente en desarrollo.

---

## Manifest y typings

Durante `icons:build` se generan automáticamente:

- manifest JSON,
- typings TypeScript,
- y sprites SVG.

---

### Manifest

```txt
public/icons/icons.manifest.json
```

Este archivo actúa como catálogo runtime de los iconos disponibles.

Actualmente representa únicamente los iconos válidos de runtime incluidos en `opo-sprite.svg`, es decir, iconos procedentes de `ui` y `brand`.

Los assets de `brand-broken` quedan deliberadamente excluidos del manifest para evitar que iconos raw no sanitizados formen parte de la API pública.

Se utiliza en:

- Storybook,
- galerías de iconos,
- tooling,
- y validación runtime.

Ejemplo de entrada:

```json
{
  "icons": [{ "name": "check" }]
}
```

- `name`: nombre público del icono usado por la API del componente.

> [!NOTE]
> El manifest actual se mantiene deliberadamente simple. Metadata adicional como categoría, keywords o `viewBox` puede añadirse en futuras iteraciones si Storybook, tooling o búsqueda visual lo requieren.

---

### TypeScript Typings

```txt
public/icons/icon-name.d.ts
```

Generado automáticamente desde el mismo catálogo de iconos runtime (`ui` + `brand`).

Esto permite:

- autocompletado,
- reducción de errores,
- sincronización entre sprite y API,
- y mejor DX para consumers TypeScript.

Actualmente los typings se consideran tooling interno y todavía no forman parte de una API pública estable documentada.

---

## Integración con Storybook

Storybook consume el manifest mediante:

```txt
fetch("/icons/icons.manifest.json")
```

en runtime.

Se evitó deliberadamente el uso de imports estáticos desde el output de build de Stencil. Los sprites se sirven como assets públicos desde `public/icons/`, evitando que `stencil build --watch` pueda eliminarlos al limpiar `dist`.

```txt
stencil build --watch
```

limpiando `dist` durante el arranque.

---

## API del componente

### Uso básico

```html
<opo-icon name="check"></opo-icon>
```

---

### Colores semánticos

```html
<opo-icon name="warning" color="danger"></opo-icon>
```

Los colores semánticos son opcionales.

Por defecto, los iconos UI heredan:

```css
currentColor
```

desde el contexto padre.

---

### Iconos decorativos

Cuando no se proporciona:

```txt
aria-label
```

el icono se considera decorativo y se oculta de tecnologías asistivas.

---

### SVG personalizado

El componente también soporta iconos personalizados mediante slot:

```html
<opo-icon aria-label="Custom icon">
  <svg slot="icon">...</svg>
</opo-icon>
```

Este soporte está pensado principalmente para contenido estático o casos puntuales que no pertenecen al catálogo principal.

---

## Estrategia currentColor

El sistema prioriza herencia mediante:

```css
currentColor
```

principalmente para iconos UI.

Esto permite que los iconos:

- hereden automáticamente el color del contexto,
- funcionen correctamente dentro de botones y componentes compuestos,
- reduzcan la necesidad de props visuales explícitas,
- y se integren mejor con theming.

Para iconos Brand, `currentColor` no siempre es deseable, ya que algunos assets necesitan preservar parte de su identidad visual original.

No obstante, determinados pictogramas utilizados en navegación o integración UI pueden aplicar una normalización cromática controlada durante la pipeline para mejorar compatibilidad visual con:

- theming,
- navegación runtime,
- `currentColor`,
- y composición dentro de componentes interactivos.

Por este motivo, la optimización de Brand prioriza preservar estructura, referencias SVG internas e identidad visual antes que aplicar normalizaciones cromáticas agresivas.

---

## Alcance actual

El objetivo principal en esta iteración es establecer una arquitectura de iconos:

- reutilizable,
- desacoplada del runtime de Stencil,
- compatible con Storybook y aplicaciones consumidoras externas,
- y preparada para evolucionar progresivamente hacia un sistema de iconografía más robusto y escalable.

Actualmente el sistema prioriza:

- generación automática de sprites SVG,
- separación entre sprites de documentación/debug y sprite runtime,
- validación y optimización diferenciada entre iconos UI y Brand,
- exclusión de assets `brand-broken` de la API pública,
- runtime serving desacoplado mediante `opo-sprite.svg`,
- manifest y typings generados automáticamente desde iconos runtime,
- y una API pública simple mediante `opo-icon`.

No se ha intentado construir todavía una plataforma completa de gestión de iconografía ni resolver todos los posibles escenarios avanzados de distribución, theming o tooling.

Algunas decisiones se han mantenido deliberadamente simples para evitar introducir complejidad prematura mientras el sistema y sus necesidades reales todavía están evolucionando.

---

## Posibles evoluciones futuras

Posibles evoluciones futuras del sistema de iconos:

- Evolucionar `icons:watch` hacia un watcher dedicado basado en herramientas como `chokidar`, permitiendo reaccionar de forma más granular a iconos añadidos, modificados o eliminados.

- Incorporar generación automática de documentación visual y galerías de iconos directamente desde `icons.manifest.json`.

- Ampliar el manifest generado para incluir metadata adicional:
  - categorías,
  - keywords,
  - tags de búsqueda,
  - aliases,
  - tamaño base,
  - o información semántica.

- Incorporar pipelines automáticas de validación visual para detectar inconsistencias de grid, tamaño óptico o alineación entre iconos UI.

- Explorar estrategias de distribución mediante CDN y versionado independiente de assets SVG.

- Añadir soporte más avanzado para theming y variaciones visuales:
  - filled / outline,
  - duotone,
  - animated icons,
  - o variantes por tema.

- Formalizar una estrategia de deprecación y migración de nombres públicos de iconos.

- Integrar tooling de sincronización entre Figma y el sistema de iconografía para reducir divergencias entre diseño y desarrollo.

- Explorar generación automática de React/Vue wrappers o exports tipados para consumers framework-specific.

- Incorporar validaciones más avanzadas de accesibilidad y consistencia visual durante la pipeline de build.
