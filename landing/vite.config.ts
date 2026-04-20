import { defineConfig, type Plugin } from 'vite';
import { resolve } from 'node:path';

function preloadFonts(): Plugin {
  return {
    name: 'preload-fonts',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        if (!ctx.bundle) return html;
        const fonts = Object.keys(ctx.bundle).filter(name => name.endsWith('.woff2'));
        if (fonts.length === 0) return html;
        const tags = fonts.map(name => `<link rel="preload" href="/${name}" as="font" type="font/woff2" crossorigin>`).join('\n    ');
        return html.replace('</title>', `</title>\n    ${tags}`);
      },
    },
  };
}

function inlineCss(): Plugin {
  return {
    name: 'inline-css',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        if (!ctx.bundle) return html;
        return html.replaceAll(/<link rel="stylesheet"[^>]*href="\/([^"]+\.css)"[^>]*>/g, (match, path) => {
          const asset = ctx.bundle?.[path];
          if (!asset?.type || asset.type !== 'asset') return match;
          const source = typeof asset.source === 'string' ? asset.source : asset.source.toString();
          return `<style>${source}</style>`;
        });
      },
    },
  };
}

export default defineConfig({
  root: __dirname,
  plugins: [preloadFonts(), inlineCss()],
  server: {
    fs: {
      allow: ['..'],
    },
  },
  build: {
    outDir: resolve(__dirname, '../dist-landing'),
    emptyOutDir: true,
    minify: 'esbuild',
    cssMinify: true,
    rollupOptions: {
      input: resolve(__dirname, 'index.html'),
    },
  },
});
