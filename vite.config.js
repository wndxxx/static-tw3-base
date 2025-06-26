import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // Base public path when served in production
  base: '/',
  
  // Configure server options
  server: {
    port: 3000,
    open: true, // Open browser on server start
  },
  
  // Build options
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        pricing: resolve(__dirname, 'pricing.html'),
      },
    },
  },
  
  // Resolve paths
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
