import { defineConfig } from 'vite';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

