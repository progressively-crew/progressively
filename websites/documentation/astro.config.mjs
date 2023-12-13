import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "Progressively",
      social: {
        github: "https://github.com/withastro/starlight",
      },
      sidebar: [
        {
          label: "Start here",
          items: [
            { label: "Getting started", link: "/getting-started" },
            { label: "Installation", link: "/installation" },
            { label: "The CLI", link: "/cli" },
          ],
        },

        {
          label: "Guides",
          items: [
            // Each item here is one entry in the navigation menu.
            { label: "Deploy to Fly", link: "/guides/deploy-to-fly" },
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
