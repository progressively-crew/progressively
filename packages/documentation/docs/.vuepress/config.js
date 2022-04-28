module.exports = {
  title: "Progressively Documentation",
  description: "The feature flag solution guides and docs",
  base: "/progressively/",
  themeConfig: {
    search: false,
    sidebar: [
      {
        title: "Get started",
        path: "/introduction/get-started",
      },
      {
        title: "Guides",
        collapsable: false,
        children: [
          {
            title: "React (client)",
            path: "/guides/react",
          },
          {
            title: "React (server)",
            path: "/guides/react-ssr",
          },
          {
            title: "JavaScript",
            path: "/guides/javascript",
          },
        ],
      },
      {
        title: "The DNA",
        path: "/introduction/dna",
      },
    ],
    displayAllHeaders: true,
  },
};
