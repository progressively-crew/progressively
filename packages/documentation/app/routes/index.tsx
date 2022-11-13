import type { LinksFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Example } from "~/components/Example";
import { Features } from "~/components/Features";
import { GetStarted } from "~/components/GetStarted";
import { Hero, HeroVariant } from "~/components/Hero";
import { WeightComparator } from "~/components/WeightComparator";
import homeCss from "../styles/home.css";
import theme from "highlight.js/styles/github-dark.css";
import { useFlags } from "@progressively/react";

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
    {
      rel: "stylesheet",
      href: theme,
    },
    { rel: "stylesheet", href: homeCss },
  ];
};

export const loader = () => {
  return {
    isProgressivelyActivated: Boolean(process.env.PROGRESSIVELY_ENV),
  };
};

// if statement is an environment variable, safe to keep the condition
const useAllFlags = () => {
  const { isProgressivelyActivated } = useLoaderData<typeof loader>();

  if (isProgressivelyActivated) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useFlags();
  }

  return { flags: {} } as any;
};

export default function Index() {
  const { flags } = useAllFlags();

  return (
    <div className="bg-gray-50">
      <main>
        {flags.newHero ? <Hero /> : <HeroVariant />}
        <Features />
        <Example />
        <WeightComparator />
        <GetStarted />
      </main>
    </div>
  );
}
