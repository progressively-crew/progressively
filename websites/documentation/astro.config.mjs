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
          items: [
            { label: "Getting started", link: "/" },
            { label: "Roadmap", link: "/roadmap" },
          ],
        },
        {
          label: "Core concepts",
          items: [
            {
              label: "Anonymity",
              link: "/concepts/anonymity",
            },
            {
              label: "Analytics",
              link: "/concepts/analytics",
            },
            { label: "Feature flags", link: "/concepts/features-flags" },
            {
              label: "Funnels",
              link: "/concepts/funnels",
            },
          ],
        },
        {
          label: "Deployments",
          autogenerate: { directory: "deployments" },
        },
        {
          label: "Using the libraries",
          items: [
            {
              label: "Feature flags",
              autogenerate: { directory: "sdks/feature-flags" },
            },
            {
              label: "Analytics",
              autogenerate: { directory: "sdks/analytics" },
            },
          ],
        },
        {
          label: "Guides",
          items: [
            {
              label: "Using the CLI",
              autogenerate: { directory: "guides/cli" },
            },
            { label: "Development setup", link: "/guides/development-setup" },
          ],
        },
      ],
    }),
  ],
});
