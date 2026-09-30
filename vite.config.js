import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// VITE_LAB_CODE comes from .env when you run the app yourself, and from the
// repository variable LAB_CODE when GitHub Actions builds it. The page shows
// the code, the same in both places.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const labCode = (env.VITE_LAB_CODE ?? "").trim().toUpperCase();

  return {
    plugins: [react()],
    define: {
      __LAB_CODE__: JSON.stringify(labCode),
      __COMMIT__: JSON.stringify((env.GITHUB_SHA ?? "").slice(0, 7)),
    },
    server: { host: true, port: 5173 },
  };
});
