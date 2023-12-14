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
          label: "Guides",
          items: [
            { label: "Using the CLI", link: "/guides/using-the-cli" },
            // Each item here is one entry in the navigation menu.
            { label: "Deploy to Render", link: "/guides/deploy-to-render" },
            {
              label: "Deploy with Docker Compose",
              link: "/guides/deploy-docker-compose",
            },
            {
              label: "Deploy with Docker",
              link: "/guides/deploy-docker",
            },

            { label: "Development setup", link: "/guides/development-setup" },
          ],
        },
        {
          label: "Reference",
          autogenerate: { directory: "reference" },
        },
      ],
    }),
  ],
});
