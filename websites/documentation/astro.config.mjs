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
          label: "Overview",
          items: [
            {
              label: "What is Progressively?",
              link: "/overview/what-is-progressively",
            },
            { label: "Quick start", link: "/overview/quick-start" },
            {
              label: "Progressively architecture",
              link: "/overview/architecture",
            },
          ],
        },
        {
          label: "Core concepts",
          items: [
            {
              label: "What are feature flags?",
              link: "/core-concepts/what-are-feature-flags",
            },
            {
              label: "Use cases and benefits",
              link: "/core-concepts/use-case-and-benefits",
            },
          ],
        },
        {
          label: "Configuration",
          items: [
            {
              label: "Targeting rules",
              link: "/configuration/targeting-rules",
            },
            {
              label: "Percentage rollout",
              link: "/configuration/percentage-rollout",
            },
            {
              label: "Environment management",
              link: "/configuration/environments-management",
            },
          ],
        },
        {
          label: "Observability",
          items: [
            {
              label: "Web analytics",
              link: "/observability/web-analytics",
            },
            {
              label: "Funnels",
              link: "/observability/funnels",
            },
          ],
        },
        {
          label: "SDKs",
          items: [
            {
              label: "Analytics",
              link: "/sdks/analytics/quantitative-analytics",
            },
            {
              label: "SDK JS",
              link: "/sdks/feature-flags/sdk-js",
            },
            {
              label: "SDK React",
              link: "/sdks/feature-flags/sdk-react",
            },
            {
              label: "SDK Server Side",
              link: "/sdks/feature-flags/sdk-server-side",
            },
          ],
        },
      ],
    }),
  ],
});
