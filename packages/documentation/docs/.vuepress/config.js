module.exports = {
  title: "Rollout Documentation",
  description: "The feature flag solution guides and docs",
  base: "/rollout/",
  themeConfig: {
    search: false,
    sidebar: [
      {
        title: "Introduction",
        collapsable: false,
        children: [
          {
            title: "Project overview",
            path: "/introduction/overview",
          },
          {
            title: "Starting the service",
            path: "/introduction/get-started",
          },
          {
            title: "The DNA",
            path: "/introduction/dna",
          },
        ],
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
    ],
    displayAllHeaders: true,
  },
};
