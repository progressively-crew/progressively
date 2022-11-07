import { Card } from "~/components/Card";
import { Hero } from "~/components/Hero";
import { EnvIcon } from "~/components/icons/EnvIcon";
import { FlagIcon } from "~/components/icons/FlagIcon";
import { ProjectIcon } from "~/components/icons/ProjectIcon";

export default function Index() {
  return (
    <div className="bg-gray-50">
      <main>
        <Hero />

        <section className="max-w-screen-xl mx-auto p-4 md:p-20">
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

              <Card title="Scheduling">
                <p>Time based flag activation</p>
              </Card>
            </div>

            <div className="col-span-3 h-full">
              <Card title="Single & Multi variants" size="L" highlighted>
                lol
              </Card>
            </div>

            <div className="col-span-2 grid gap-3 grid-rows-5">
              <div className="row-span-3">
                <Card title="Strategies">
                  Rollout to only specific subsets of your audience
                </Card>
              </div>
              <div className="row-span-2">
                <Card title="Insights">lol</Card>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
