import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "Progressively",
      social: {
        github: "https://github.com/progressively-crew/progressively",
      },
      sidebar: [
        {
          label: "Start here",
          items: [{ label: "Getting started", link: "/getting-started" }],
        },
        {
          label: "Core concepts",
          items: [
            { label: "Feature flags", link: "/concepts/features-flags" },
            {
              label: "Anonymous analytics",
              link: "/concepts/anonymous-analytics",
            },
          ],
        },
        {
          label: "Guides",
          items: [
            {
              label: "Deploy Progressively",
              link: "/guides/deployments",
            },
            {
              label: "Using the CLI",
              link: "/guides/cli",
            },
            { label: "Development setup", link: "/guides/development-setup" },
          ],
        },
        {
          label: "SDKs",
          autogenerate: { directory: "sdks" },
        },
      ],
    }),
  ],
});
