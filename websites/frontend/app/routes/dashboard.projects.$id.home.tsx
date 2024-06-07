import { DashboardLayout } from "~/layouts/DashboardLayout";
import { LoaderFunction, MetaFunction } from "@remix-run/node";
import { useProject } from "~/modules/projects/contexts/useProject";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { PageTitle } from "~/components/PageTitle";
import { ProjectNavBar } from "~/modules/projects/components/ProjectNavBar";
import { useLoaderData } from "@remix-run/react";
import { getSession } from "~/sessions";
import { Section, SectionHeader } from "~/components/Section";
import { Button } from "~/components/Buttons/Button";
import { FlagIcon } from "~/components/Icons/FlagIcon";
import { TbChartAreaLine } from "react-icons/tb";
import { BiBook } from "react-icons/bi";
import { Tab, TabContent, TabList, Tabs } from "~/components/Tabs";
import { Card, CardContent } from "~/components/Card";

import {
  setupFeatureFlagSample,
  setupProviderSample,
} from "@progressively/instructions/samples/getReactSample";
import { getProject } from "~/modules/projects/services/getProject";
import { Project } from "~/modules/projects/types";
import { Codeblock } from "~/components/Codeblock";
import { Typography } from "~/components/Typography";

export const meta: MetaFunction = ({ matches }) => {
  const projectName = getProjectMetaTitle(matches);

  return [
    {
      title: `Progressively | ${projectName} | API Documentation`,
    },
  ];
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const project: Project = await getProject(
    params.id!,
    session.get("auth-cookie")
  );
  const [setupFeatureFlagSampleCode, setupProviderSampleCode] =
    await Promise.all([
      setupFeatureFlagSample(),
      setupProviderSample(project.clientKey),
    ]);

  return { setupFeatureFlagSampleCode, setupProviderSampleCode };
};

export default function SettingsPage() {
  const { project } = useProject();
  const { setupFeatureFlagSampleCode, setupProviderSampleCode } =
    useLoaderData<typeof loader>();

  return (
    <DashboardLayout subNav={<ProjectNavBar project={project} />}>
      <PageTitle value="Welcome" />

      <div className="pt-12">
        <Section>
          <SectionHeader
            title="Get started by creating feature flags"
            description="Start using Progressively by creating your first feature flag and integrate it to your application. Don't forget to integrate the analytics SDK too!"
          />
          <div className="flex flex-row gap-4 pt-4">
            <Button
              size="S"
              icon={<FlagIcon />}
              variant="secondary"
              href="./flags/all"
            >
              Feature flags
            </Button>
            <Button
              size="S"
              icon={<TbChartAreaLine />}
              variant="secondary"
              href="./analytics"
            >
              Analytics
            </Button>
            <Button
              size="S"
              icon={<BiBook />}
              variant="secondary"
              href="https://docs.progressively.app/"
            >
              Documentation
            </Button>
          </div>
        </Section>
      </div>

      <div className="pt-12">
        <Section>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <SectionHeader title="Integrate a feature flag SDK" />
            </div>

            <Card>
              <Tabs initialValue="react">
                <TabList>
                  <Tab value="react">React</Tab>
                </TabList>
                <TabContent value="react">
                  <CardContent>
                    <Typography className="text-sm pb-4">
                      1. Wrap your application with the ProgressivelyProvider:
                    </Typography>
                    <Card>
                      <CardContent>
                        <Codeblock
                          html={setupProviderSampleCode.html}
                          rawCode={setupProviderSampleCode.rawCode}
                        />
                      </CardContent>
                    </Card>

                    <Typography className="text-sm py-4">
                      2. Get the feature flags dictionary and make a condition
                      to start using it
                    </Typography>
                    <Card>
                      <CardContent>
                        <Codeblock
                          html={setupFeatureFlagSampleCode.html}
                          rawCode={setupFeatureFlagSampleCode.rawCode}
                        />
                      </CardContent>
                    </Card>
                  </CardContent>
                </TabContent>
              </Tabs>
            </Card>
          </div>
        </Section>
      </div>
    </DashboardLayout>
  );
}
