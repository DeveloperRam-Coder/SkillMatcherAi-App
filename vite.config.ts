import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Custom plugin for tagging components (optional, safe to keep)
function componentTagger() {
  return {
    name: "component-tagger",
    transform(code: any, id: string) {
      if (id.endsWith(".tsx") || id.endsWith(".jsx")) {
        console.log(`[ComponentTagger] Processing: ${id}`);
      }
      return code;
    },
  };
}

// Export Vite configuration
export default defineConfig(({ mode }) => ({
  // ✅ Important for Vercel — Vite will use this for dev only
  server: {
    host: "::", // IPv6 localhost
    port: 8080,
  },

  // ✅ Plugins
  plugins: [
    react(),
    ...(mode === "development" ? [componentTagger()] : []),
  ],

  // ✅ Module resolution aliases
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  // ✅ Set output directory — this is important for Vercel
  build: {
    outDir: "dist", // Vercel looks for this by default
    emptyOutDir: true,
  },
}));
