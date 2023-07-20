const { getProgressivelyData } = require("@progressively/server-side");
const http = require("http");

const requestListener = function (req, res) {
  res.setHeader("Content-Type", "text/html");
  res.writeHead(200);

  (async () => {
    const { data } = await getProgressivelyData("valid-sdk-key", {
      apiUrl: "http://localhost:4000",
      fields: {
        email: "marvin.frachet@something.com",
        id: "1",
      },
    });

    const flags = data.flags;

    if (flags.newHomepage) {
      res.end(`New variant`);
    } else {
      res.end(`Old variant`);
    }
  })();
};

const server = http.createServer(requestListener);
server.listen(3000);
