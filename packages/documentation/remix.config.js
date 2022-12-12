/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ["**/.*"],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "build/index.js",
  // publicPath: "/build/",
  mdx: async (filename) => {
    const [rehypeAutolinkHeadings, rehypeHighlight, remarkEmoji, rehypeSlug] =
      await Promise.all([
        import("rehype-autolink-headings").then((mod) => mod.default),
        import("rehype-highlight").then((mod) => mod.default),
        import("remark-emoji").then((mod) => mod.default),
        import("rehype-slug").then((mod) => mod.default),
      ]);

    return {
      remarkPlugins: [remarkEmoji],
      rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings, rehypeHighlight],
    };
  },
};
