import { DashboardLayout } from "~/layouts/DashboardLayout";
import { V2_MetaFunction } from "@remix-run/node";
import { useProject } from "~/modules/projects/contexts/useProject";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { getEnvMetaTitle } from "~/modules/environments/services/getEnvMetaTitle";
import { getFlagEnvMetaTitle } from "~/modules/flags/services/getFlagEnvMetaTitle";
import { Card, CardContent } from "~/components/Card";
import { PageTitle } from "~/components/PageTitle";
import { Section } from "~/components/Section";
import { ProjectNavBar } from "~/modules/projects/components/ProjectNavBar";
import { InsightsFilters } from "~/modules/projects/components/InsightsFilters";
import { BarChart } from "~/components/BarChart";
import { Typography } from "~/components/Typography";

export const meta: V2_MetaFunction = ({ matches, params }) => {
  const projectName = getProjectMetaTitle(matches);
  const envName = getEnvMetaTitle(matches, params.env!);
  const flagName = getFlagEnvMetaTitle(matches);

  return [
    {
      title: `Progressively | ${projectName} | ${envName} | ${flagName} | Funnels`,
    },
  ];
};

export default function FunnelsPage() {
  const { project } = useProject();
  const chartData = [
    {
      name: "New homepage",
      value: 122,
    },
    {
      name: "New homepage track cta",
      value: 145,
    },
  ];

  return (
    <DashboardLayout subNav={<ProjectNavBar project={project} />}>
      <PageTitle
        value="Funnels"
        action={
          <InsightsFilters
            projectId={project.uuid}
            environments={project.environments}
          />
        }
      />
      <Section>
        <Card>
          <CardContent>
            <div className="flex flex-row justify-between">
              <Typography as="h2" className="font-semibold text-xl">
                Funnel name
              </Typography>
              <BarChart data={chartData} />
            </div>
          </CardContent>
        </Card>
      </Section>
    </DashboardLayout>
  );
}
