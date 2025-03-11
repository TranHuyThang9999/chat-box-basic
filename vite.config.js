import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import zaloMiniApp from "zmp-vite-plugin";

export default () => {
  return defineConfig({
    root: "./src",
    base: "",
    plugins: [zaloMiniApp(), react()],
    server: {
      allowedHosts: ["38f9-1-52-218-172.ngrok-free.app"], // Cho phép host ngrok
      cors: true, // Đảm bảo không bị chặn CORS
      host: "0.0.0.0", // Để truy cập từ bên ngoài
      port: 5173, // Đảm bảo chạy đúng port (thay đổi nếu cần)
    },
  });
};
