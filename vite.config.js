import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";
// import jsonServer from 'jsonServer'; // Import your JSON server configuration
import jsonServer from "json-server";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000", // Assuming JSON server runs on port 3000
        router: () => jsonServer, // Direct requests to /api/customers to your JSON server
      },
    },
  },
});
