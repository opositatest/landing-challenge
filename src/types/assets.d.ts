/**
 * Allows importing SVG files as raw inline strings via Vite.
 *
 * Example:
 * import logo from './logo.svg?raw'
 */
declare module "*.svg?raw" {
  const content: string;
  export default content;
}
