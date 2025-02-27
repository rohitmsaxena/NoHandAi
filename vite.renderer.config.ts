import { defineConfig } from "vite";
import path from "path";

// https://vitejs.dev/config
export default defineConfig({
  //... other config
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "src/renderer/index.html"),
        toolbar: path.resolve(__dirname, "src/renderer/toolbar/toolbar.html"),
      },
    },
  },
});
