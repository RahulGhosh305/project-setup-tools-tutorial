import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // the "development" key represents a proxy rule that matches requests starting with /development
      "/development": {
        target: "https://jsonplaceholder.typicode.com", // Replace with your backend API URL
        changeOrigin: true, // Adjust the `Origin` header to match the target URL
        secure: false, // Optional: Set to false if using an HTTPS target with self-signed certificate
        rewrite: (path) => path.replace(/^\/development/, ""), // Optional: Removes `/development` prefix if needed
      },
      // multiple base urls
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
