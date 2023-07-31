import { Progressively } from "@progressively/server-side";

export async function FlaggedComponent() {
  const sdk = Progressively.init("valid-sdk-key", {
    websocketUrl: "ws://localhost:4000",
    apiUrl: "http://localhost:4000",
    fields: {
      email: "marvin.frachet@something.com",
      id: "1",
    },
  });

  const {
    data: { flags },
  } = await sdk.evaluateFlag("newHomepage");

  if (flags?.newHomepage) {
    return <div>New variant</div>;
  }

  return <div>Old variant</div>;
}
