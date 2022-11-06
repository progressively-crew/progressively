import { Card } from "~/components/Card";
import { Hero } from "~/components/Hero";

export default function Index() {
  return (
    <div className="bg-gray-50">
      <main>
        <Hero />

        <section className="max-w-screen-xl mx-auto p-4 md:p-12 ">
          <div className="grid grid-cols-7 gap-3">
            <div className="col-span-2 grid gap-3">
              <Card title="Hierarchical">
                <p>Multiple projects, environments, feature flags and so on.</p>
              </Card>

              <Card title="Scheduling">
                <p>Time based flag activation</p>
              </Card>
            </div>

            <div className="col-span-3 h-full">
              <Card title="Single & Multi variants" size="L">
                lol
              </Card>
            </div>

            <div className="col-span-2 grid gap-3">
              <Card title="Strategies">
                Rollout to only specific subsets of your audience
              </Card>
              <Card title="Insights">lol</Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
