// Pull the bundlephobia data concerning @progressively/react
// to display metrics in the homepage
const https = require("node:https");
const reactPackage = require("../../react/package.json");
const fs = require("node:fs");
const path = require("node:path");

https
  .get(
    `https://bundlephobia.com/api/size?package=${reactPackage.name}@${reactPackage.version}&record=true`,
    (resp) => {
      let data = "";

      // Un morceau de réponse est reçu
      resp.on("data", (chunk) => {
        data += chunk;
      });

      // La réponse complète à été reçue. On affiche le résultat.
      resp.on("end", () => {
        const { gzip, size } = JSON.parse(data);
        console.log(process.cwd());

        const publicFrontendPath = path.join(
          __dirname,
          "..",
          "app",
          "progressively-sdk-sizes.json"
        );

        const jsonString = JSON.stringify({ gzip, size });
        fs.writeFileSync(publicFrontendPath, jsonString);
        console.log(
          "\nBundlephobia information regarding the @progressively/react package has been updated"
        );
      });
    }
  )
  .on("error", (err) => {
    console.log("Error: " + err.message);
  });
