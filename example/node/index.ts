import ProgressivelySdk from "@progressively/node";

const sdk = ProgressivelySdk.init("valid-sdk-key", {
  websocketUrl: "ws://localhost:4000",
  apiUrl: "http://localhost:4000",
  fields: {
    email: "marvin.frachet@something.com",
    id: "1",
  },
});

(async () => {
  const x = await sdk.loadFlags();
  console.log("lol", x);
})();
