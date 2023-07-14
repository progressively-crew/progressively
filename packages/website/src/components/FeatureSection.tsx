import { Card } from "./Card";
import { FaChartLine, FaPaw } from "react-icons/fa";
import {
  AiOutlineAppstore,
  AiOutlineBarChart,
  AiFillGithub,
} from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import { MdSchedule } from "react-icons/md";
import { BiNetworkChart } from "react-icons/bi";
import { TbSend, TbServer, TbBrandTypescript } from "react-icons/tb";
import { BsServer } from "react-icons/bs";

const dashboardFeatures = [
  {
    title: "Granular audience targeting",
    description: "Gradual rollout and attribute based targeting.",
    Icon: FaChartLine,
  },
  {
    title: "Multi variants",
    description: "Use booleans or multiple values for your feature flags.",
    Icon: AiOutlineAppstore,
  },
  {
    title: "Segments of users",
    description:
      "Create group of users for an easier targeting strategy using their attributes.",
    Icon: FiUsers,
  },
  {
    title: "Scheduling",
    description:
      "Define when a feature flag should be activated or deactivated.",
    Icon: MdSchedule,
  },
  {
    title: "Insights",
    description:
      "Define metrics and cross their hits with the flag evaluation data.",
    Icon: AiOutlineBarChart,
  },
];

const sectionTitleClass = "font-bold text-2xl pb-4";
const cardTitleClass = "font-bold text-xl pb-2";
const gridClass = "grid md:grid-cols-3 gap-4";
const iconClass = "w-10 h-10 mb-4 rounded p-2 text-white";

const devFeatures = [
  {
    title: "Small bundle footprint",
    description:
      "Stop bloating your bundle with third-party apps. The React SDK is only 1.3kB.",
    Icon: FaPaw,
  },
  {
    title: "Edge runtime",
    description:
      "It works on Edge runtime and can be used in Vercel and competitors.",
    Icon: BiNetworkChart,
  },
  {
    title: "Realtime",
    description: "Get realtime flag update with websockets.",
    Icon: TbSend,
  },
  {
    title: "SSR",
    description:
      "It works with the modern SSR framework with no blinks on initial page load.",
    Icon: TbServer,
  },
  {
    title: "Open Source",
    description:
      "All the codebase is Open Source and available in the Github Repository.",
    Icon: AiFillGithub,
  },
  {
    title: "Typesafe",
    description:
      "Auto completion for your available flags and variant values in your IDE.",
    Icon: TbBrandTypescript,
  },
];

const everyone = [
  {
    title: "Self-hosted or SaaS",
    description:
      "You can install the tool on your servers or use the online service.",
    Icon: BsServer,
  },
];

export const FeatureSection = () => {
  return (
    <section className="py-20">
      <div className="px-4 md:px-8 max-w-6xl mx-auto">
        <h2 className="font-extrabold text-4xl md:text-7xl pb-4">
          Everything is included
        </h2>
        <p className="text-2xl leading-relaxed pb-8">
          We got some additional features to help you release with even more
          confidence.
        </p>

        <div className="pt-8">
          <h3 className={sectionTitleClass}>For dashboard users</h3>
          <div className={gridClass}>
            {dashboardFeatures.map((feature) => (
              <article key={feature.title}>
                <Card>
                  {feature.Icon && (
                    <feature.Icon className={`${iconClass} bg-purple-500`} />
                  )}
                  <h4 className={cardTitleClass}>{feature.title}</h4>
                  <p>{feature.description}</p>
                </Card>
              </article>
            ))}
          </div>
        </div>

        <div className="pt-8">
          <h3 className={sectionTitleClass}>Developpers, we got your back</h3>
          <div className={gridClass}>
            {devFeatures.map((feature) => (
              <article key={feature.title}>
                <Card>
                  {feature.Icon && (
                    <feature.Icon className={`${iconClass} bg-teal-500`} />
                  )}
                  <h4 className={cardTitleClass}>{feature.title}</h4>
                  <p>{feature.description}</p>
                </Card>
              </article>
            ))}
          </div>
        </div>

        <div className="pt-8">
          <h3 className={sectionTitleClass}>And for everyone</h3>
          <div className={gridClass}>
            {everyone.map((feature) => (
              <article key={feature.title}>
                <Card>
                  {feature.Icon && (
                    <feature.Icon className={`${iconClass} bg-pink-500`} />
                  )}
                  <h4 className={cardTitleClass}>{feature.title}</h4>
                  <p>{feature.description}</p>
                </Card>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
