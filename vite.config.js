import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import zaloMiniApp from "zmp-vite-plugin";

export default defineConfig({
  base: "",
  plugins: [zaloMiniApp(), react()],
  server: {
    allowedHosts: "all",
    cors: true,
    host: "0.0.0.0",
    port: 3000,
  },
});
