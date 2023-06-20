import { Card } from "./Card";

const dashboardFeatures = [
  {
    title: "Granular audience targeting",
    description: "Gradual rollout and attribute based targeting.",
  },
  {
    title: "Multi variants",
    description: "Use booleans or multiple values for your feature flags.",
  },
  {
    title: "Segments of users",
    description:
      "Create group of users for an easier targeting strategy using their attributes.",
  },
  {
    title: "Scheduling",
    description:
      "Define when a feature flag should be activated or deactivated.",
  },
  {
    title: "Insights",
    description:
      "Define metrics and cross their hits with the flag evaluation data.",
  },
];

const devFeatures = [
  {
    title: "Small bundle footprint",
    description:
      "Stop bloating your bundle with third-party apps. The React SDK is only 1.3kB.",
  },
  {
    title: "Edge runtime",
    description:
      "It works on Edge runtime and can be used in Vercel and competitors.",
  },
  {
    title: "Realtime",
    description: "Get realtime flag update with websockets.",
  },
  {
    title: "SSR",
    description:
      "It works with the modern SSR framework with no blinks on initial page load.",
  },
  {
    title: "Open Source",
    description:
      "All the codebase is Open Source and available in the Github Repository.",
  },
];

const everyone = [
  {
    title: "Self-hosted or SaaS",
    description:
      "You can install the tool on your servers or use the online service.",
  },
  {
    title: "Accessible",
    description:
      "We do our best to make the dashboard accessible. Please help us getting there!",
  },
];

export const FeatureSection = () => {
  const sectionTitleClass = "font-bold text-2xl pb-4";
  const cardTitleClass = "font-bold text-xl pb-2";
  const gridClass = "grid md:grid-cols-3 gap-4";

  return (
    <section className="py-20">
      <div className="px-4 md:px-8 max-w-6xl mx-auto">
        <h2 className="font-extrabold text-4xl md:text-5xl pb-4">
          What's inside?
        </h2>

        <div className="pt-4">
          <h3 className={sectionTitleClass}>For dashboard users</h3>
          <div className={gridClass}>
            {dashboardFeatures.map((feature) => (
              <article key={feature.title}>
                <Card>
                  <h4 className={cardTitleClass}>{feature.title}</h4>
                  <p>{feature.description}</p>
                </Card>
              </article>
            ))}
          </div>
        </div>

        <div className="pt-8">
          <h3 className={sectionTitleClass}>For developpers</h3>
          <div className={gridClass}>
            {devFeatures.map((feature) => (
              <article key={feature.title}>
                <Card>
                  <h4 className={cardTitleClass}>{feature.title}</h4>
                  <p>{feature.description}</p>
                </Card>
              </article>
            ))}
          </div>
        </div>

        <div className="pt-8">
          <h3 className={sectionTitleClass}>For everyone</h3>
          <div className={gridClass}>
            {everyone.map((feature) => (
              <article key={feature.title}>
                <Card>
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
