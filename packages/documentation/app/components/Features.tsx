import { BsClockHistory } from "react-icons/bs";
import { MdBubbleChart } from "react-icons/md";
import { TbChartPie } from "react-icons/tb";
import { AiOutlineAppstore, AiOutlineBarChart } from "react-icons/ai";

import { Card } from "./Card";
import { EnvIcon } from "./icons/EnvIcon";
import { FlagIcon } from "./icons/FlagIcon";
import { ProjectIcon } from "./icons/ProjectIcon";

export const Features = () => (
  <div className="bg-gray-900">
    <section className="max-w-screen-xl mx-auto pb-4 md:pb-20">
      <div className="grid grid-cols-7 gap-3">
        <div className="col-span-2 grid gap-3">
          <Card
            title="Hierarchical"
            top={
              <div className="flex gap-4 flex-row justify-center text-2xl">
                <ProjectIcon className="text-indigo-500" />
                <EnvIcon className="text-purple-500" />
                <FlagIcon className="text-pink-500" />
              </div>
            }
          >
            <p>Multiple projects, environments, feature flags and so on</p>
          </Card>

          <Card
            title="Scheduling"
            bottom={
              <div className="bg-gray-900 text-white p-2 rounded-3xl flex flex-row gap-4 text-sm">
                <BsClockHistory className="text-lg" />
                <span>Flag activated at 9am tomorrow</span>
              </div>
            }
          >
            <p>Activate or deactivate your flags at a given time</p>
          </Card>
        </div>

        <div className="col-span-3 h-full">
          <Card
            title="Single & Multi variants"
            size="L"
            highlighted
            top={
              <div className="flex gap-3 text-4xl">
                <AiOutlineAppstore />
                <AiOutlineBarChart />
                <MdBubbleChart />
              </div>
            }
          >
            Create single or multi-variants for your flags, monitor their
            evaluations, add custom metrics and understand the way your audience
            uses your app.
          </Card>
        </div>

        <div className="col-span-2 grid gap-3 grid-rows-2">
          <Card
            title="Strategies"
            top={
              <div className="top-0 h-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 absolute w-full left-0" />
            }
            bottom={<TbChartPie className="text-4xl text-indigo-500" />}
          >
            Rollout to only specific subsets of your audience
          </Card>

          <Card
            title="Gradual rollout"
            bottom={
              <div className="relative">
                <div className="h-6 px-2 text-white rounded-full bg-indigo-700 absolute -top-2 left-2/4 text-sm font-bold flex items-center">
                  53%
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full" />
              </div>
            }
          >
            Target a percentage of your audience when deploying
          </Card>
        </div>
      </div>
    </section>
  </div>
);
