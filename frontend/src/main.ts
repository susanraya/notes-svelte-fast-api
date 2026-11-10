import { mount } from "svelte";

import App from "@/App.svelte";
import "@/index.css";

mount(App, { target: document.getElementById("root")! });

// Registers the service worker vite-plugin-pwa builds, so the already-loaded app shell
// (HTML/JS/CSS/icons) keeps opening and working with no network at all (US-010, NFR-002).
// `registerType: "autoUpdate"` on the plugin means a new build takes over silently on the
// next load -- no prompt is needed here. This only ever caches static assets: no note data
// passes through it, and no API route is registered or proxied.
if ("serviceWorker" in navigator) {
  import("virtual:pwa-register")
    .then(({ registerSW }) => registerSW({ immediate: true }))
    .catch(() => {
      // No service worker support, or the virtual module isn't available (e.g. dev
      // server without the plugin's dev SW enabled): the app still works online.
    });
}
