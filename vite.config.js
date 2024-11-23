import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import { defineConfig } from 'vite';
dotenv.config();

// Proxy middleware for API calls
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // // Proxy all requests starting with `/api-v1` to the target server
      // '/api-v1': { // Prefix
      //   // eslint-disable-next-line no-undef
      //   target: process.env.VITE_API_V1_URL,  // Replace with your backend API URL
      //   changeOrigin: true,  // Adjust the `Origin` header to match the target URL
      //   secure: false,   //  Optional: Set to false if using an HTTPS target with self-signed certificate
      //   rewrite: (path) => path.replace(/^\/api-v1/, ''),  // Optional: Removes `/api-v1` prefix if needed
      // },

      // //  Add multiple proxies
      // '/api-v2': {
      //   // eslint-disable-next-line no-undef
      //   target: process.env.VITE_API_V2_URL,
      //   changeOrigin: true,
      //   secure: false,
      //   rewrite: (path) => path.replace(/^\/api-v2/, ''),
      // },

      '/production': {
        // eslint-disable-next-line no-undef
        target: process.env.VITE_API_URL,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/production/, ''),
      },

      '/development': {
        // eslint-disable-next-line no-undef
        target: process.env.VITE_API_URL,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/development/, ''),
      },
    },
  },
});
