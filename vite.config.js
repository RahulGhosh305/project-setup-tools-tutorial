import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // this api is proxied name url
      "/development": {
        target: "https://jsonplaceholder.typicode.com", // Replace with your backend API URL
        changeOrigin: true, // Adjust the `Origin` header to match the target URL
        secure: false, // Optional: Set to false if using an HTTPS target with self-signed certificate
        rewrite: (path) => path.replace(/^\/development/, ""), // Optional: Removes `/api-v1` prefix if needed
      },
      "/production": {
        target: "https://dummyjson.com",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/production/, ""),
      },
      "/qa": {
        target: "https://qa-api.com",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/qa/, ""),
      },
    },
  },
});
