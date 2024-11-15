// @ts-check
import { defineConfig } from 'astro/config';

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  // TODO: update with real site URL
  site: "https://example.com",

  integrations: [svelte()]
});