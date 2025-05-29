import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import node from '@astrojs/node';

export default defineConfig({
  site: 'https://seu-blog.com.br',
  output: 'server',
  adapter: node({
    mode: 'standalone'
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