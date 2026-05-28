# Layering & Motion

---

## Estrategia de Layering

La estrategia de layering y motion del sistema se ha planteado con el objetivo de:

- mantener una jerarquía visual predecible,
- evitar conflictos entre componentes reutilizables,
- y reducir comportamientos inesperados relacionados con stacking contexts o animaciones excesivamente complejas.

Aunque el alcance de esta iteración no requería una arquitectura avanzada de overlays o motion, se han definido algunas foundations reutilizables para facilitar una evolución más consistente del sistema.

### Tokens de z-index

En lugar de utilizar valores arbitrarios directamente dentro de los componentes:

```css
z-index: 9999;
```

el sistema utiliza una pequeña escala de layering basada en tokens reutilizables.

La estrategia sigue la misma arquitectura de capas utilizada en el resto de Design Tokens:

```txt
reference tokens
        ↓
system tokens
        ↓
component styles
```

Los reference tokens contienen únicamente valores numéricos reutilizables:

```css
--ref-z-index-0: 0;
--ref-z-index-100: 100;
--ref-z-index-200: 200;
--ref-z-index-300: 300;
--ref-z-index-400: 400;
--ref-z-index-500: 500;
--ref-z-index-600: 600;
--ref-z-index-700: 700;
```

Estos valores no expresan todavía intención visual.

Los system tokens representan decisiones reales de layering dentro de la interfaz:

```css
--sys-z-index-header
--sys-z-index-dropdown
--sys-z-index-overlay
--sys-z-index-modal
--sys-z-index-toast
--sys-z-index-tooltip
```

Ejemplo:

```css
/* reference-tokens.css */
:root {
  --ref-z-index-200: 200;
}
```

```css
/* system-tokens.css */
:root {
  --sys-z-index-header: var(--ref-z-index-200);
}
```

Esto permite desacoplar:

- el valor numérico,
- de la intención visual del sistema.

### ¿Por qué tokenizar el layering?

La estrategia busca evitar la clásica “inflación de z-index”:

```css
z-index: 999;
z-index: 9999;
z-index: 99999;
```

que suele aparecer cuando distintos componentes comienzan a competir entre sí sin una jerarquía clara.

Centralizar el layering mediante tokens favorece:

- consistencia,
- mantenibilidad,
- previsibilidad,
- y mejor escalabilidad del sistema.

### Stacking Contexts

Por otro lado, en arquitecturas frontend contemporáneas orientadas a componentes, muchos problemas relacionados con `z-index` no provienen únicamente del valor numérico utilizado, sino de la **interacción entre distintos stacking contexts** generados dentro de la aplicación.

> [!WARNING]
> Algunos stacking contexts pueden generarse de forma implícita mediante propiedades como `transform`, `opacity`, `filter` o determinados contextos de posicionamiento `position + z-index`, alterando el comportamiento esperado de `z-index` dentro de la interfaz.

### isolation:isolate

Por este motivo, para ayudar a encapsular la jerarquía visual de la aplicación, además de la escala de layering tokens, el sistema incorpora `isolation: isolate` sobre los contenedores raíz habituales en aplicaciones React y Next.js (`#root`, `#\_\_next`) siguiendo la aproximación propuesta por Josh Comeau:

```css
/* reset.css */
#root,
#__next {
  isolation: isolate;
}
```

Esta propiedad permite crear un **_root stacking context_** para la aplicación, ayudando a encapsular el comportamiento de layering dentro del árbol principal de la UI y reduciendo posibles conflictos entre componentes reutilizados en distintos contextos de composición o layout.

Desde esta perspectiva, `isolation: isolate` no sustituye a la estrategia de `z-index` tokens, sino que la complementa:

- Los tokens definen la jerarquía global de capas del sistema.
- `isolation: isolate` ayuda a encapsular y hacer más predecible el comportamiento interno de stacking entre componentes.

Ambas capas se complementan:

```txt
z-index tokens
→ definen jerarquía visual

isolation:isolate
→ encapsula stacking contexts
```

Esta combinación favorece arquitecturas de layering más robustas, desacopladas y escalables a largo plazo.

---

## Estrategia de Motion

### Filosofía de motion

Aunque el alcance de esta iteración no requería una estrategia avanzada de motion, las animaciones y transiciones se han planteado desde una perspectiva funcional y discreta.

La intención principal es mejorar:

- feedback visual,
- continuidad entre estados,
- claridad de interacción,
- y percepción de jerarquía.

No se busca utilizar motion como elemento puramente decorativo.

### Escala de motion

El sistema incorpora una pequeña escala de durations reutilizables orientada a cubrir distintos tipos de interacción y feedback visual dentro de la interfaz.

```css
/* Motion durations */
--ref-motion-duration-faster: 100ms; /* hover, focus, press feedback, microinteractions */
--ref-motion-duration-fast: 150ms; /* small fades, loaders, lightweight UI transitions */
--ref-motion-duration-normal: 250ms; /* dropdowns, accordions, medium transitions */
--ref-motion-duration-slow: 350ms; /* modals, drawers, larger motion sequences */
```

La intención es proporcionar una base suficientemente flexible para cubrir:

- feedback rápido,
- transiciones estándar,
- motion más expresiva,
- y animaciones continuas o en loop.

En esta iteración se evita crear demasiados aliases semánticos adicionales (`--sys-motion-\*`) hasta que aparezcan patrones de uso más consistentes dentro del sistema.

```css
--sys-motion-duration-spinner
```

salvo cuando exista una necesidad semántica realmente consolidada.

La intención es evitar sobre-abstracción innecesaria.

#### Continuous Motion

Animaciones continuas como spinners utilizan duraciones más lentas:

```css
animation: icon-spin var(--ref-motion-duration-slower) linear infinite;
```

Este tipo de motion pertenece a una categoría distinta de las transiciones rápidas de UI y suele requerir tiempos más largos para resultar visualmente cómodos.

### Reduced Motion & Accessibility

El sistema contempla compatibilidad con:

```css
prefers-reduced-motion
```

como parte de una estrategia progresiva de accesibilidad y progressive enhancement.

Ejemplo:

```css
@media (prefers-reduced-motion: reduce) {
  .opo-icon--spin {
    animation: none;
  }
}
```

La intención es reducir motion no esencial cuando el usuario así lo solicita desde el sistema operativo.

---

## Alcance actual

En esta iteración, la estrategia de layering y motion se mantiene deliberadamente contenida.

El objetivo principal es:

- establecer foundations reutilizables,
- evitar conflictos de stacking,
- introducir una escala básica de motion,
- y mantener una experiencia visual coherente.

---

## Posibles evoluciones futuras

Posibles evoluciones futuras:

- semantic motion tokens,
- easing tokens reutilizables,
- overlay manager centralizado,
- animation presets,
- visual regression de overlays,
- motion choreography entre componentes,
- y estrategias más avanzadas de focus management y layering para modales complejos.
