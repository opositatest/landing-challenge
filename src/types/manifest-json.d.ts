/**
 * Tipado de módulos para archivos .manifest.json generados por la pipeline de iconos.
 * Permite importar el catálogo de iconos (icons.manifest.json) en TypeScript sin errores de tipos.
 * Ejemplo de uso:
 *   import manifest from 'public/icons/icons.manifest.json';
 *   manifest.icons.forEach(icon => ...)
 *
 * Este tipado asume que el JSON exporta un objeto con una propiedad 'icons',
 * que es un array de objetos con al menos la propiedad 'name'.
 */
declare module "*.manifest.json" {
  const value: {
    icons: Array<{ name: string }>;
  };

  export default value;
}
