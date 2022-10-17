export default {
  title: "Progressively documentation",
  description: "Rollout quickly, effectively, Progressively",

  themeConfig: {
    siteTitle: false,
    logo: "/logo.svg",
    nav: [
      {
        text: "Github",
        link: "https://github.com/progressively-crew/progressively",
      },
    ],

    sidebar: [
      {
        text: "Introduction",
        items: [
          { text: `Why Progressively?`, link: "/introduction/why" },
          { text: "Getting Started", link: "/introduction/getting-started" },
          { text: "Configuration", link: "/introduction/configuration" },
        ],
      },
      {
        text: "Features",
        items: [
          {
            text: `Hierarchical structure`,
            link: "/features/hierarchical-structure",
          },
          {
            text: `Single & Multi variants`,
            link: "/features/single-multi-variants",
          },
          {
            text: `Scheduled flag update`,
            link: "/features/scheduled-flag-update",
          },
          {
            text: `Feature flag strategies`,
            link: "/features/flag-strategies",
          },
          {
            text: `Simple insights`,
            link: "/features/simple-insights",
          },
        ],
      },
      {
        text: "SDKs",
        items: [
          { text: "JavaScript", link: "/guides/javascript" },
          { text: "Node.js", link: "/guides/node-js" },
          { text: "React", link: "/guides/react" },
          { text: "PHP", link: "/guides/php" },
          { text: "<add yours>", link: "/guides/add-your-sdk" },
        ],
      },
    ],

    editLink: {
      pattern:
        "https://github.com/progressively-crew/progressively/edit/main/docs/:path",
    },

    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2022-present Marvin Frachet",
    },
  },
};
