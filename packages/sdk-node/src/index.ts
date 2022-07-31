import ProgressivelySdk, {
  ProgressivelySdkType,
  SDKOptions,
} from "@progressively/sdk-js";
const nodeFetch = require("node-fetch");

export * from "@progressively/sdk-js";

const btoA = (toTransform: string) =>
  Buffer.from(toTransform).toString("base64");

function init(clientKey: string, options?: SDKOptions): ProgressivelySdkType {
  const sdk = ProgressivelySdk.init(clientKey, options);

  function loadFlags() {
    return sdk.loadFlags({
      btoAFn: btoA,
      alternativeFetch: nodeFetch as typeof fetch,
    });
  }

  return {
    ...sdk,
    loadFlags,
  };
}

export default { init };
