import type { LinksFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Features } from "~/components/Features";
import { Hero } from "~/components/Hero";
import { WeightComparator } from "~/components/WeightComparator";
import homeCss from "../styles/home.css";
import theme from "highlight.js/styles/github-dark.css";
import { useFlags } from "@progressively/react";
import { SiteNav } from "~/components/SiteNav";
import { Timeline, TimelineStep } from "~/components/Timeline";
import {
  Installation,
  InstallationCli,
} from "~/modules/getstarted/Installation";
import { ChooseSdk, ChooseSdkCode } from "~/modules/getstarted/ChooseSdk";
import { CreateFlag, CreateFlagImg } from "~/modules/getstarted/CreateFlag";
import { AiOutlineArrowDown } from "react-icons/ai";

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
  useAllFlags();

  return (
    <div className="bg-gray-50">
      <SiteNav />
      <main>
        <div className="flex flex-col gap-20">
          <Hero />

          <div>
            <div className="flex justify-center text-gray-400 text-4xl pb-4">
              <AiOutlineArrowDown />
            </div>

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
          </div>

          <Features />

          <WeightComparator />
        </div>
      </main>
    </div>
  );
}
