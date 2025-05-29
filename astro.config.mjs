import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import netlify from '@astrojs/netlify';

export default defineConfig({
  site: 'https://blog-relax-tech.netlify.app',
  output: 'server',
  adapter: netlify({
    edgeMiddleware: true
  }),
  integrations: [
    tailwind(),
    sitemap(),
    react()
  ],
  i18n: {
    defaultLocale: 'pt-BR',
    locales: ['pt-BR']
  }
});