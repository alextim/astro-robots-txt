import { defineConfig } from 'astro/config';
import sitemap from 'astro-sitemap-i18n';

// https://astro.build/config
export default defineConfig({
  // Important!
  // Only official '@astrojs/*' integrations are currently supported by Astro.
  // Add 'experimental.integrations: true' to make 'astro-robots-txt' working with 'astro build' command.
  experimental: {
    integrations: true,
  },
  integrations: [sitemap()],
});
