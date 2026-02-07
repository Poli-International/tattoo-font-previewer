import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import compression from 'vite-plugin-compression';

export default defineConfig({
  base: './',
  plugins: [
    react(),
    compression({ algorithm: 'gzip' })
  ],
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        embed: './embed.html'
      },
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom']
        }
      }
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true
      }
    }
  },
  server: {
    port: 3000
  }
});
