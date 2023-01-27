import type { LinksFunction, MetaFunction } from "@remix-run/node";
import homeCss from "../styles/home.css";
import { SiteNav } from "~/components/SiteNav";
import { Logo } from "~/components/Logo";
import { Button } from "~/components/Button";

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
    "og:image": "https://progressively.app/logo.jpg",
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

    { rel: "stylesheet", href: homeCss },
  ];
};

export default function Index() {
  return (
    <div className="bg-gray-50 dark:bg-slate-900">
      <SiteNav />
      <main>
        <div className="max-w-screen-xl mx-auto px-4 md:px-0 py-12 md:py-32 w-full">
          <div>
            <div className="md:pb-8">
              <Logo className="h-16 w-16" />
            </div>

            <h1 className="text-black text-3xl dark:text-white font-extrabold sm:text-5xl p-1">
              <span className="sm:block dark:text-indigo-400 text-indigo-700">
                Progressively{" "}
              </span>
              Demo instance
            </h1>

            <p className="mt-4 max-w-xl sm:text-xl sm:leading-relaxed text-gray-600 dark:text-slate-200">
              You are about to enter the demo instance of Progressively. Make
              sure to not use it as a production ready instance:
              <br />
              <strong>data will be erased regularly</strong>.
            </p>

            <div className="inline-block pt-8">
              <Button href="https://dashboard.progressively.app/signin">
                Enter the demo instance
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
