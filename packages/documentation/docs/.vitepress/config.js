export default {
  title: "Progressively documentation",
  description: "Rollout quickly, effectively, Progressively",

  themeConfig: {
    siteTitle: false,
    logo: "/logo.svg",
    nav: [
      { text: "Guide", link: "/guide" },
      { text: "Configs", link: "/configs" },
      { text: "Changelog", link: "https://github.com/..." },
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
  },
};
