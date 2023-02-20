import { Card } from "./Card";

const HorizontalLine = () => (
  <div
    className="border-b border-gray-500 border-dashed h-[1px] hidden lg:block lg:w-[956px] mx-auto"
    aria-hidden
  />
);

const VerticalLine = () => (
  <div
    className="h-12 w-[1px] mx-auto border-r border-gray-500 border-dashed"
    aria-hidden
  />
);

export const Features = () => (
  <section>
    <h2 className="text-center text-3xl md:text-6xl font-semibold mb-8">
      Operate
    </h2>

    <VerticalLine />
    <HorizontalLine />

    <div className="grid px-4 lg:px-0 lg:grid-cols-4 lg:gap-6">
      <Card title="Scheduling">
        <p>Activate or deactivate your flags at any given time</p>
      </Card>

      <Card title="Single & Multi variants">
        Create single or multi-variants, monitor their evaluations and add
        custom metrics to analyze conversion
      </Card>

      <Card title="Audience Eligibility">
        Rollout to only specific subsets of your audience based on qualitative
        criteria
      </Card>

      <Card title="Gradual rollout">
        Target a percentage of your audience when deploying
      </Card>
    </div>

    <HorizontalLine />
    <VerticalLine />
  </section>
);
