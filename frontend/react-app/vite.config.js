import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      css: {
        include: ['node_modules/flowbite-react/dist/flowbite.css'],
      },
    },
  },
  server: {
    host: '0.0.0.0', // Ensure Vite binds to all network interfaces
    port: 5173, // Match the exposed port in docker-compose.yml
    strictPort: true, // Fail if port is already in use
    watch: {
      usePolling: true, // Ensure file changes are detected in Docker
    },
  },
});
