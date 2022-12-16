import { BsClockHistory } from "react-icons/bs";
import { MdBubbleChart } from "react-icons/md";
import { TbChartPie } from "react-icons/tb";
import { AiOutlineAppstore, AiOutlineBarChart } from "react-icons/ai";
import { Card } from "./Card";
import { VisuallyHidden } from "./VisuallyHidden";

export const Features = () => (
  <section className="max-w-screen-xl mx-auto">
    <h2 className="text-center text-3xl md:text-6xl font-bold">Operate</h2>
    <div className="grid px-4 lg:px-0 lg:grid-cols-4 gap-6 pt-12">
      <Card
        title="Scheduling"
        bottom={
          <div className="flex justify-center">
            <div className="inline-block">
              <p className="bg-gray-900 text-white p-2 rounded-3xl flex flex-row gap-4 text-sm">
                <BsClockHistory className="text-lg" aria-hidden />
                <span>
                  <VisuallyHidden>Example:</VisuallyHidden> Flag activated at
                  9am tomorrow
                </span>
              </p>
            </div>
          </div>
        }
      >
        <p>Activate or deactivate your flags at a given time</p>
      </Card>

      <Card
        title="Single & Multi variants"
        top={
          <div className="flex gap-6 text-4xl justify-center" aria-hidden>
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

      <Card
        title="Audience Eligibility"
        top={
          <div className="flex justify-center">
            <TbChartPie aria-hidden className="text-4xl" />
          </div>
        }
      >
        Rollout to only specific subsets of your audience
      </Card>

      <Card
        title="Gradual rollout"
        bottom={
          <div className="flex justify-center">
            <input
              type="range"
              aria-label="Percentage of the audience"
              onChange={(e) => {}}
              value={67}
            />
          </div>
        }
      >
        Target a percentage of your audience when deploying
      </Card>
    </div>
  </section>
);
