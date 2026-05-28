# Responsive Strategy

---

## Estrategia de Breakpoints

Los breakpoints originales estaban definidos principalmente siguiendo una aproximación _“device-oriented”_, tomando como referencia resoluciones concretas de dispositivos (ej: `375px => iPhone`) o convenciones responsive históricas ampliamente utilizadas (ej: `992px => tablets`).

Con el objetivo de evitar que la estrategia responsive dependiera directamente de tamaños de pantalla específicos, he decidido refactorizar el sistema hacia una escala de breakpoints orientada a representar zonas intermedias alejadas de las resoluciones reales más frecuentes o _“dead-zones”_, permitiendo así agrupar dispositivos similares bajo un mismo comportamiento responsive y reduciendo la necesidad de introducir adaptaciones específicas para resoluciones muy próximas entre sí.

```css
/* Before */
--breakpoint-xs: 375px;
/* After */
--ref-breakpoint-sm: 576px;

/* Before */
--breakpoint-m: 992px;
/* After */
--ref-breakpoint-lg: 1024px;
```

### Dead Zones

Para ello, he tomado como referencia la distribución actual de resoluciones más comunes publicada por [Screen Resolution Stats](https://gs.statcounter.com/screen-resolution-stats), donde puede observarse cómo las resoluciones tienden a agruparse en distintas franjas naturales `(mobile, tablet, laptop, desktop, etc.)` en lugar de distribuirse de forma uniforme.

Bajo esta lógica, por ejemplo, `375px` no debería actuar necesariamente como breakpoint, ya que se encuentra literalmente en el centro del cluster móvil más habitual.

> [!TIP]
> Se ha tenido en cuenta tanto las estadísticas globales (_worldwide_) como las correspondientes a España (_Spain_), observándose una distribución de resoluciones muy similar en ambos casos.
> Esto ayudó a validar que la escala propuesta resultara coherente tanto con tendencias globales como con el posible público objetivo y contexto de uso de la aplicación.

Considero que esta propuesta de escala intenta situarse en un punto intermedio razonable entre el concepto de `dead-zones`, la familiaridad con convenciones ampliamente utilizadas por el ecosistema frontend actual y la mantenibilidad del sistema a largo plazo.

### Unidades de Breakpoints

Los breakpoints se han definido en `px` al considerar que representan puntos de transición estructurales del layout y no escalas tipográficas, permitiendo mantener un comportamiento responsive más estable y predecible independientemente de posibles cambios en el `font-size` raíz del navegador.

### Nomenclatura de Breakpoints

La nomenclatura de los breakpoints también ha sido actualizada para alinearla con convenciones ampliamente adoptadas por sistemas modernos como Tailwind CSS (`sm`, `md`, `lg`, `xl`, `2xl`...), favoreciendo una mayor familiaridad y consistencia con el ecosistema frontend actual.

En cualquier caso, aunque resulta recomendable disponer de un conjunto reducido y consistente de breakpoints de referencia, esto no impide que en determinados escenarios puedan surgir `edge-cases`, puntos de corte más específicos asociados a necesidades concretas del diseño o al comportamiento particular de ciertos componentes.

---

## Aproximación Mobile-First

Aunque el diseño proporcionado en Figma únicamente incluye la versión desktop, los componentes han sido implementados siguiendo una aproximación responsive **mobile-first**.

Más allá de responder únicamente al dispositivo predominante desde el que acceden los usuarios, hoy en día considero el enfoque mobile-first principalmente como una estrategia de arquitectura responsive y _progressive enhancement_, donde los estilos base representan el estado más universal y limitado de los componentes, añadiendo progresivamente mejoras conforme aumenta el espacio disponible.

Esta aproximación favorece una cascada CSS más simple y predecible, reduce la necesidad de sobrescribir estilos complejos entre breakpoints y facilita la construcción de interfaces más mantenibles, escalables y resilientes a largo plazo.

---

## Media Queries y Container Queries

Aunque el sistema mantiene una escala de breakpoints globales basada en _media queries_ para decisiones estructurales de layout, considero que en arquitecturas frontend modernas orientadas a componentes las _container queries_ representan una aproximación especialmente interesante para adaptar componentes reutilizables en función de su contexto real de renderizado y no únicamente del viewport global.

A diferencia de las media queries tradicionales, que responden al _viewport_ (tamaño total de la ventana gráfica), las _container queries_ permiten que un componente adapte su comportamiento en función del tamaño de su contenedor padre.

En sistemas basados en componentes, un mismo elemento puede reutilizarse en contextos de layout muy distintos (`sidebar`, `grid`, `modal`, `hero`, etc.), donde el espacio disponible no siempre guarda una relación directa con el tamaño total del _viewport_. En este sentido, las _container queries_ favorecen la construcción de componentes más autónomos, flexibles y desacoplados de su contexto específico de composición o layout.

---

## Tipografía Responsive

En lugar de basar toda la estrategia tipográfica exclusivamente en breakpoints rígidos mediante media queries, he optado por una aproximación híbrida donde determinados system typography tokens pueden incorporar comportamiento responsive y fluid typography mediante `clamp()` cuando resulta realmente beneficioso para el contexto visual del componente.

Considero que en sistemas de diseño modernos orientados a componentes no toda la tipografía necesita comportarse de forma completamente fluida.

> [!TIP]
> Aunque `clamp()` y fluid typography resultan especialmente útiles en determinados contextos expresivos (`hero`, `display`, `marketing`, etc.), considero importante evitar convertirlos en una solución universal aplicada indiscriminadamente a toda la interfaz.
>
> En muchos componentes UI, una escala tipográfica más estable y predecible suele favorecer mejor la legibilidad, consistencia visual y mantenibilidad del sistema.

En este sentido, `clamp()` no se plantea únicamente como un recurso para generar escalados fluidos, sino también como una herramienta que permite reducir la necesidad de múltiples ajustes tipográficos específicos mediante media queries, simplificando progresivamente la estrategia responsive del sistema.

Ejemplo:

```css
/* reference-tokens.css */
:root {
  --ref-font-size-500: 1.25rem;
  --ref-font-size-700: 1.5rem;
}

/* system-tokens.css */
:root {
  --sys-typography-heading-md-size: clamp(
    var(--ref-font-size-500),
    1rem + 0.8vw,
    var(--ref-font-size-700)
  );
}

/* card.css */
.card-title {
  font-size: var(--sys-typography-heading-md-size);
}
```

```jsx
render() {
    return (
      <article class="card">
        <h2 class="card-title">{this.title}</h2>
        <slot />
      </article>
    );
  }
```

---

## Alcance actual

En esta iteración, la estrategia responsive se ha planteado como una base razonable y extensible, no como una taxonomía cerrada para todos los posibles escenarios de layout.

El sistema define una escala inicial de breakpoints, una aproximación mobile-first y una adopción selectiva de técnicas modernas como `clamp()` y `container queries`, priorizando aquellos casos donde aportan claridad, mantenibilidad y mejor adaptación al contexto real del componente.

No se ha intentado resolver todavía una estrategia completa para todos los patrones responsive posibles, ya que en un entorno real esta capa debería evolucionar junto con los componentes, los datos de uso, las necesidades de producto y la colaboración con diseño.

---

## Posibles evoluciones futuras

- **Validación de breakpoints con datos reales de uso**
  - Revisar la escala responsive a partir de analítica real del producto, dispositivos más utilizados y patrones de navegación observados.

- **Mayor adopción de container queries**
  - Evolucionar componentes reutilizables para que puedan adaptarse mejor al espacio disponible en su contenedor, no solo al viewport global.

- **Documentación visual de patrones responsive**
  - Añadir ejemplos en Storybook que muestren cómo se comportan los componentes en distintos anchos, layouts y contextos de composición.

- **Estrategia más formal de fluid typography**
  - Definir qué tipos de texto pueden usar `clamp()` y cuáles deberían mantenerse más estables por legibilidad y consistencia UI.

- **Responsive testing**
  - Incorporar validaciones visuales o end-to-end en distintos tamaños de viewport para detectar regresiones en layout, overflow o comportamiento responsive.

- **Design-dev alignment**
  - Alinear la estrategia responsive con criterios compartidos entre diseño y desarrollo, evitando breakpoints definidos únicamente por dispositivos concretos.
