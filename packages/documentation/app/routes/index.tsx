import type { LinksFunction, MetaFunction } from "@remix-run/node";
import { Example } from "~/components/Example";
import { Features } from "~/components/Features";
import { GetStarted } from "~/components/GetStarted";
import { Hero } from "~/components/Hero";

const title = "Progressively, simple and accessible feature flagging tool";
const description =
  "A simple, accessible, lightweight, self-hosted and OpenSource feature flagging tool. Rollout easily and with confidence. Supports frameworks with SSR capabilities.";

export const meta: MetaFunction = () => {
  return {
    title,
    description,
    "og:url": "https://progressively.app",
    "og:title": title,
    "og:description": description,
    "og:image": "https://progressively.app/logo.png",
    "og:type": "website",
    "og:site_name": "Progressively",
    "twitter:card": "summary_large_image",
    "twitter:creator": "@mfrachet",
    "twitter:site": "@mfrachet",
  };
};

export const links: LinksFunction = () => {
  return [
    {
      rel: "canonical",
      href: "https://progressively.app",
    },
  ];
};

export default function Index() {
  return (
    <div className="bg-gray-50">
      <main>
        <Hero />
        <Features />
        <Example />
        <GetStarted />
      </main>
    </div>
  );
}
