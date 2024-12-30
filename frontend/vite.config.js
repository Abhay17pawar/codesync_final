import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    proxy: {
      '/graphql': {
        target: 'https://leetcode.com',
        changeOrigin: true, // ensures the origin is updated
        rewrite: (path) => path.replace(/^\/graphql/, '/graphql'),
      },
    },
  },
  plugins: [react()],
});
