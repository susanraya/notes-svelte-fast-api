/// <reference types="vitest" />
import { fileURLToPath, URL } from "node:url";

import { svelte } from "@sveltejs/vite-plugin-svelte";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    svelte(),
    tailwindcss(),
    // Precaches the built app shell (HTML/JS/CSS) and registers a service worker so the
    // SPA opens and keeps working offline after the first load (US-010, NFR: offline
    // operation). All note data stays in the browser's own local storage; this only
    // caches the static assets that render it.
    VitePWA({
      registerType: "autoUpdate",
      // Registered explicitly from main.ts via `virtual:pwa-register`, not injected
      // into index.html -- keeps the registration visible and testable in one place.
      injectRegister: false,
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,ico}"],
      },
      manifest: {
        name: "notes svelte fast api",
        short_name: "Notes",
        description: "a simple notes app without login",
        start_url: ".",
        display: "standalone",
        background_color: "#f4f4f0",
        theme_color: "#1d3fff",
      },
    }),
  ],
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
    // Svelte's package hands a server build to anything without the browser condition,
    // and component tests mount in jsdom like a browser.
    ...(process.env.VITEST ? { conditions: ["browser"] } : {}),
  },
  // Component tests live beside the components they cover, in jsdom.
  test: {
    // Component tests only. Scoped to `src/` so the Playwright specs in `e2e/` -- which
    // match the default `*.spec.ts` pattern -- are left to Playwright.
    include: ["src/**/*.{test,spec}.ts"],
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test-setup.ts"],
    css: false,
    // Coverage is measured by the sprint's test check and reported as a json-summary the
    // platform reads back for the development dashboard.
    coverage: {
      provider: "v8",
      reporter: ["text", "json-summary"],
      reportsDirectory: "./coverage",
    },
  },
});
