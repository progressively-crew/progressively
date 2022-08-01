const { Progressively } = require("@progressively/sdk-node");
const http = require("http");

const sdk = Progressively.init("valid-sdk-key", {
  websocketUrl: "ws://localhost:4000",
  apiUrl: "http://localhost:4000",
  fields: {
    email: "marvin.frachet@something.com",
    id: "1",
  },
});

const requestListener = function (req, res) {
  res.setHeader("Content-Type", "text/html");
  res.writeHead(200);

  (async () => {
    const { flags } = await sdk.loadFlags();

    if (flags.newHomepage) {
      res.end(`New variant`);
    } else {
      res.end(`Old variant`);
    }
  })();
};

const server = http.createServer(requestListener);
server.listen(3000);
