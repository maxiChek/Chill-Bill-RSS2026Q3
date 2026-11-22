import { defineConfig } from 'vite';

export default defineConfig({
  base: '/Chill-Bill-RSS2026Q3/',
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        app: 'app.html',
      },
    },
  },
});
