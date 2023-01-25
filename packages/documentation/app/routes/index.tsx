import type { LinksFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Features } from "~/components/Features";
import { Hero } from "~/components/Hero";
import { WeightComparator } from "~/components/WeightComparator";
import homeCss from "../styles/home.css";
import darkTheme from "highlight.js/styles/github-dark.css";
import lightTheme from "highlight.js/styles/github.css";
import { useFlags } from "@progressively/react";
import { SiteNav } from "~/components/SiteNav";
import {
  Installation,
  InstallationCli,
} from "~/modules/getstarted/Installation";
import { ChooseSdk, ChooseSdkCode } from "~/modules/getstarted/ChooseSdk";
import { CreateFlag, CreateFlagImg } from "~/modules/getstarted/CreateFlag";
import { AiOutlineArrowDown } from "react-icons/ai";
import { Timeline, TimelineStep } from "~/components/TImeline";
import { Spacer } from "~/components/Spacer";
import { ExampleSection } from "~/modules/example/ExampleSection";
import { Analyze } from "~/modules/analyze/Analyze";

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
    {
      rel: "stylesheet",
      href: darkTheme,
    },
    {
      rel: "stylesheet",
      href: lightTheme,
      media: "(prefers-color-scheme: dark)",
    },

    { rel: "stylesheet", href: homeCss },
  ];
};

export const loader = () => {
  return {
    isProgressivelyActivated: Boolean(process.env.PROGRESSIVELY_ENV),
  };
};

export default function Index() {
  return (
    <div className="bg-gray-50 dark:bg-slate-900">
      <SiteNav />
      <main>
        <Hero />

        <section className="py-20 lg:py-28 bg-white dark:bg-slate-800">
          <div className="max-w-screen-xl mx-auto px-4">
            <ExampleSection />
          </div>
        </section>

        <div className="max-w-screen-xl mx-auto px-4">
          <section className="pb-4 pt-20">
            <h2 className="text-center text-3xl md:text-6xl font-semibold dark:text-white pb-8">
              Prepare your instance
            </h2>

            <Timeline>
              <TimelineStep
                left={<InstallationCli />}
                right={<Installation />}
                position={"1"}
              />
              <TimelineStep
                left={<CreateFlagImg />}
                right={<CreateFlag />}
                position={"2"}
              />
              <TimelineStep
                left={<ChooseSdkCode />}
                right={<ChooseSdk />}
                position={"3"}
              />
            </Timeline>

            <div className="flex justify-center text-gray-400 text-4xl pt-4">
              <AiOutlineArrowDown />
            </div>
          </section>

          <div className="pb-4">
            <Features />

            <div className="flex justify-center text-gray-400 text-4xl pt-4">
              <AiOutlineArrowDown />
            </div>
          </div>

          <div className="pb-32">
            <Analyze />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 py-20 lg:py-28">
          <div className="max-w-screen-xl mx-auto px-4">
            <WeightComparator />
          </div>
        </div>
      </main>
    </div>
  );
}
