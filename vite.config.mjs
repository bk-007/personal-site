import { cloudflare } from '@cloudflare/vite-plugin';
import { sites } from '@openai/sites-vite-plugin';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    sites(),
    cloudflare({ viteEnvironment: { name: 'server' } }),
  ],
  environments: {
    client: {
      build: {
        rollupOptions: {
          input: {
            home: resolve(import.meta.dirname, 'index.html'),
            projects: resolve(import.meta.dirname, 'projects.html'),
          },
        },
      },
    },
  },
});
