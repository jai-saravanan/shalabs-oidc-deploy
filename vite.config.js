import { execSync } from "node:child_process";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Actions sets both when it builds the site; a codespace sets the
// repository. A clone on your own machine has neither, so the repository
// comes from its git remote. The page shows what it has, and leaves out
// what it hasn't.
const env = process.env;

function repositoryFromRemote() {
  try {
    const url = execSync("git remote get-url origin", { stdio: ["ignore", "pipe", "ignore"] }).toString().trim();
    return url.match(/github\.com[/:]([^/]+\/[^/]+?)(?:\.git)?$/)?.[1] ?? "";
  } catch {
    return "";
  }
}

export default defineConfig({
  plugins: [react()],
  define: {
    __REPO__: JSON.stringify(env.GITHUB_REPOSITORY || repositoryFromRemote()),
    __COMMIT__: JSON.stringify((env.GITHUB_SHA ?? "").slice(0, 7)),
  },
  server: { host: true, port: 5173 },
});
