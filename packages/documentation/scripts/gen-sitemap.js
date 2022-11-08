const { exec } = require("node:child_process");
const fs = require("fs/promises");
const path = require("node:path");

const outputFile = path.join(__dirname, "..", "public", "sitemap.xml");

const fileModificationDate = (filePath) => {
  return fs
    .stat(path.join(__dirname, "..", "app", filePath))
    .then((stats) => stats.mtime);
};

let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

const buildSiteMap = async (routes = [], root = undefined) => {
  for (const route of routes) {
    if (route.children) {
      await buildSiteMap(route.children, route);
    } else {
      const lastModified = await fileModificationDate(route.file);
      const pagePath = route.index
        ? root?.path || "/"
        : root?.path + "/" + route.path;

      sitemap += `  <url>
    <loc>https://progressively.app/${pagePath}</loc>
    <lastmod>${lastModified}</lastmod>
  </url>\n`;
    }
  }
};

const main = async () => {
  return new Promise((resolve) => {
    exec(`npx remix routes --json`, (error, stdout, stderr) => {
      if (error) {
        return console.error(`exec error: ${error}`);
      }

      if (stderr) {
        return console.error(`stderr: ${stderr}`);
      }

      const jsonRoutes = JSON.parse(stdout);

      buildSiteMap(jsonRoutes).then(() => {
        sitemap += `</urlset> 
        `;
        resolve(sitemap);
      });
    });
  });
};

main()
  .then(() => fs.writeFile(outputFile, sitemap))
  .then(() => {
    console.log("Generated");
  });
