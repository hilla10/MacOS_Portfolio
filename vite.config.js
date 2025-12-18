import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import tailwindcss from '@tailwindcss/vite';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@components': resolve(__dirname, 'src/components'),
      '@constants': resolve(__dirname, 'src/constants'),
      '@store': resolve(__dirname, 'src/store'),
      '@hoc': resolve(__dirname, 'src/hoc'),
      '@windows': resolve(__dirname, 'src/windows'),
      '@utils': resolve(__dirname, 'src/utils'),
    },
  },
  server: {
    host:true
  }
});
