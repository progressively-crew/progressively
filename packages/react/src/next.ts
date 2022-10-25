import { SDKOptions } from "@progressively/sdk-js";
import { getSSRProps } from "./ssr";

export function getNextProps(
  clientKey: string,
  options: SDKOptions,
  req: Request,
  res: any
) {
  const { fields } = options;
  return getSSRProps(clientKey, {
    ...options,
    fields: {
      id: fields?.id || (req as any).cookies?.["progressively-id"] || null,
      ...(fields || {}),
    },
  }).then((response) => {
    res.setHeader("set-cookie", response.cookies);
    return response;
  });
}
