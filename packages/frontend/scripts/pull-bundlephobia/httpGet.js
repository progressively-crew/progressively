const https = require("node:https");

const httpGet = (url) => {
  return new Promise((resolve, reject) => {
    https
      .get(url, (resp) => {
        let data = "";

        // Un morceau de réponse est reçu
        resp.on("data", (chunk) => {
          data += chunk;
        });

        // La réponse complète à été reçue. On affiche le résultat.
        resp.on("end", () => {
          resolve(JSON.parse(data));
        });
      })
      .on("error", (err) => {
        reject(err);
      });
  });
};

module.exports = httpGet;
