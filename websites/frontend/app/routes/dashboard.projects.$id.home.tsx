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
import { BiBook, BiCog } from "react-icons/bi";
import { Tab, TabContent, TabList, Tabs } from "~/components/Tabs";
import { Card, CardContent } from "~/components/Card";

import { getProject } from "~/modules/projects/services/getProject";
import { Project } from "~/modules/projects/types";
import { Codeblock } from "~/components/Codeblock";
import { Typography } from "~/components/Typography";
import { TbChartAreaLine } from "react-icons/tb";
import { setupAnalytics } from "~/modules/instructions/samples/getAnalyticsSample";
import { setupNode } from "~/modules/instructions/samples/getNodeSample";
import {
  setupFeatureFlagSample,
  setupProviderSample,
} from "~/modules/instructions/samples/getReactSample";
import { setupSdkJs } from "~/modules/instructions/samples/getSdkJsSample";

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
  const [
    setupFeatureFlagSampleCode,
    setupProviderSampleCode,
    nodeSampleCode,
    jsSampleCode,
    analyticsCode,
  ] = await Promise.all([
    setupFeatureFlagSample(),
    setupProviderSample(project.clientKey),
    setupNode(project.clientKey),
    setupSdkJs(project.clientKey),
    setupAnalytics(project.clientKey),
  ]);

  return {
    setupFeatureFlagSampleCode,
    setupProviderSampleCode,
    nodeSampleCode,
    jsSampleCode,
    analyticsCode,
  };
};

export default function SettingsPage() {
  const { project } = useProject();
  const {
    setupFeatureFlagSampleCode,
    setupProviderSampleCode,
    nodeSampleCode,
    jsSampleCode,
    analyticsCode,
  } = useLoaderData<typeof loader>();

  return (
    <DashboardLayout subNav={<ProjectNavBar project={project} />}>
      <PageTitle
        value="Welcome"
        description="Welcome to your project. This page will help you get set up for using Progressively with your project."
      />

      <div className="pt-20">
        <Section>
          <SectionHeader
            title="Get started by creating a feature flag"
            description="Feature flags are one of the core entities used by Progressively. Create your first one by following the step provided in the link just below."
          />
          <div className="flex flex-row gap-4 pt-4">
            <Button
              size="S"
              icon={<FlagIcon />}
              variant="secondary"
              href="./flags/all/create"
            >
              Create a feature flag
            </Button>
            <Button
              size="S"
              icon={<BiBook />}
              variant="secondary"
              href="https://docs.progressively.app/concepts/features-flags/"
              target="_blank"
            >
              What are feature flags?
            </Button>
          </div>
        </Section>
      </div>

      <div className="pt-20">
        <Section>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <SectionHeader
                title="Integrate a feature flag SDK"
                description="Progressively comes with multiple SDKs that will facilitate the communication between your project and this dashboard. If you don't find the one that fits your needs, please, open a request so that we can work on it."
              />

              <div className="flex flex-row gap-4 pt-4">
                <Button
                  size="S"
                  icon={<BiCog />}
                  variant="secondary"
                  href="https://github.com/progressively-crew/progressively/issues/new?assignees=&labels=&projects=&template=feature_request.md&title=[SDK]:%20Request%20SDK%20support"
                  target="_blank"
                >
                  Request a SDK support
                </Button>
              </div>
            </div>

            <Card>
              <Tabs initialValue="js">
                <TabList>
                  <Tab value="js">JS</Tab>
                  <Tab value="react">React</Tab>
                  <Tab value="node">Node</Tab>
                </TabList>
                <TabContent value="js">
                  <CardContent>
                    <Typography className="text-sm pb-4">
                      1. Install the dependency
                    </Typography>
                    <Card>
                      <CardContent>
                        <Codeblock
                          html={jsSampleCode.installation}
                          rawCode={jsSampleCode.installation}
                        />
                      </CardContent>
                    </Card>

                    <Typography className="text-sm py-4">
                      2. Prepare the SDK
                    </Typography>
                    <Card>
                      <CardContent>
                        <Codeblock
                          html={jsSampleCode.html}
                          rawCode={jsSampleCode.rawCode}
                        />
                      </CardContent>
                    </Card>
                  </CardContent>
                </TabContent>
                <TabContent value="react">
                  <CardContent>
                    <Typography className="text-sm pb-4">
                      1. Install the dependency
                    </Typography>
                    <Card>
                      <CardContent>
                        <Codeblock
                          html={setupProviderSampleCode.installation}
                          rawCode={setupProviderSampleCode.installation}
                        />
                      </CardContent>
                    </Card>

                    <Typography className="text-sm py-4">
                      2. Wrap your application with the ProgressivelyProvider:
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
                      3. Get the feature flags dictionary and make a condition
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

                <TabContent value="node">
                  <CardContent>
                    <Typography className="text-sm pb-4">
                      1. Install the dependency
                    </Typography>
                    <Card>
                      <CardContent>
                        <Codeblock
                          html={nodeSampleCode.installation}
                          rawCode={nodeSampleCode.installation}
                        />
                      </CardContent>
                    </Card>

                    <Typography className="text-sm py-4">
                      2. Prepare the SDK
                    </Typography>
                    <Card>
                      <CardContent>
                        <Codeblock
                          html={nodeSampleCode.html}
                          rawCode={nodeSampleCode.rawCode}
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

      <div className="pt-20">
        <Section>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <SectionHeader
                title="Integrate the analytics script"
                description="The analytics script is responsible for capturing the user interactions with your project such as page views, custom events and more. Once it's setup, you'll be able to analyze your audience behaviour in the analytics panel."
              />

              <div className="flex flex-row gap-4 pt-4">
                <Button
                  size="S"
                  icon={<TbChartAreaLine />}
                  variant="secondary"
                  href="./analytics"
                  target="_blank"
                >
                  Analytics dashboard
                </Button>
              </div>
            </div>

            <Card>
              <CardContent>
                <Codeblock
                  html={analyticsCode.html}
                  rawCode={analyticsCode.rawCode}
                />
              </CardContent>
            </Card>
          </div>
        </Section>
      </div>
    </DashboardLayout>
  );
}
