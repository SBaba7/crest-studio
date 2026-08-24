import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import fs from "fs";

function debugLogPlugin(): Plugin {
  return {
    name: "debug-log",
    configureServer(server) {
      server.middlewares.use("/__debug_log", (req, res, next) => {
        if (req.method !== "POST") return next();
        let body = "";
        req.on("data", (chunk) => {
          body += chunk;
        });
        req.on("end", () => {
          const logPath = path.resolve(import.meta.dirname, "debug-ed1dc1.log");
          fs.appendFileSync(logPath, `${body.trim()}\n`);
          res.statusCode = 204;
          res.end();
        });
      });
    },
  };
}

export default defineConfig(({ command }) => ({
  plugins: [
    ...(command === "serve" ? [debugLogPlugin()] : []),
    react(),
    tailwindcss(),
  ],
  server: {
    host: "0.0.0.0",
    port: 3000,
    allowedHosts: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  build: {
    target: "es2020",
    cssCodeSplit: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/gsap")) return "gsap";
          if (id.includes("node_modules/framer-motion") || id.includes("node_modules/motion-dom")) return "motion";
          if (id.includes("node_modules/@paper-design")) return "shaders";
        },
      },
    },
  },
}));
