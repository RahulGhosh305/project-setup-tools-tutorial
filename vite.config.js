import react from '@vitejs/plugin-react-swc';
import dotenv from 'dotenv';
import { defineConfig } from 'vite';
dotenv.config();

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/development": {
        // eslint-disable-next-line no-undef
        target: process.env.VITE_API_URL,  // Replace with your backend API URL
        changeOrigin: true,  // Adjust the `Origin` header to match the target URL
        secure: false,   //  Optional: Set to false if using an HTTPS target with self-signed certificate
        rewrite: (path) => path.replace(/^\/development/, ''),  // Optional: Removes `/api-v1` prefix if needed
      },

      //  Add multiple proxies
      '/production': {
        // eslint-disable-next-line no-undef
        target: process.env.VITE_API2_URL,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/production/, ''),
      }
    }
  }
})
