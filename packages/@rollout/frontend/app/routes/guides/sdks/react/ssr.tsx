import { LoaderFunction, useLoaderData } from "remix";
import { toMarkdown } from "~/modules/guides/toMarkdown";

export const loader: LoaderFunction = ({ request }) => {
  const url = new URL(request.url);
  const sdkKey = url.searchParams.get("sdk-key");

  const html = toMarkdown("./guides/sdks/react/ssr.md", {
    "#clientKey#": sdkKey || "put-your-own-sdk-key-here",
    "#clientKeyComment#": sdkKey
      ? "// the client sdk key is yours, you can copy this code directly :)"
      : undefined,
  });

  return { html };
};

export default function SsrPage() {
  const { html } = useLoaderData();

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
