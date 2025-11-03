import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  server: {
    host: 'localhost',
    port: 80,
    strictPort: true,
  },
  preview: {
    host: 'localhost',
    port: 80,
    strictPort: true,
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        transcriber: resolve(__dirname, 'transcriber.html'),
        psalmtone: resolve(__dirname, 'psalmtone.html'),
        readings: resolve(__dirname, 'readings.html'),
        propers: resolve(__dirname, 'propers.html'),
        faq: resolve(__dirname, 'faq.html'),
        'psalms/index': resolve(__dirname, 'psalms/index.html'),
      },
    },
  },
  root: '.',
});

