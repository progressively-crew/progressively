import { DashboardLayout } from "~/layouts/DashboardLayout";
import { FlagStatus } from "~/modules/flags/types";
import { getSession } from "~/sessions";
import { Header } from "~/components/Header";
import { AiOutlineBarChart } from "react-icons/ai";
import { getFlagHits } from "~/modules/flags/services/getFlagHits";
import { ToggleFlag } from "~/modules/flags/components/ToggleFlag";
import { BigStat } from "~/components/BigStat";
import { styled } from "~/stitches.config";
import { MetaFunction, ActionFunction, LoaderFunction } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { TagLine } from "~/components/Tagline";
import { FlagMenu } from "~/modules/flags/components/FlagMenu";
import { useUser } from "~/modules/user/contexts/useUser";
import { useProject } from "~/modules/projects/contexts/useProject";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { useEnvironment } from "~/modules/environments/contexts/useEnvironment";
import { getEnvMetaTitle } from "~/modules/environments/services/getEnvMetaTitle";
import { useFlagEnv } from "~/modules/flags/contexts/useFlagEnv";
import { getFlagMetaTitle } from "~/modules/flags/services/getFlagMetaTitle";
import { Stack } from "~/components/Stack";
import { toggleFlagAction } from "~/modules/flags/form-actions/toggleFlagAction";
import { Card, CardContent } from "~/components/Card";
import { TextInput } from "~/components/Fields/TextInput";
import { SubmitButton } from "~/components/Buttons/SubmitButton";
import { HStack } from "~/components/HStack";
import { EmptyState } from "~/components/EmptyState";
import { Typography } from "~/components/Typography";
import { PageTitle } from "~/components/PageTitle";
import { FlagIcon } from "~/components/Icons/FlagIcon";
import { VisuallyHidden } from "~/components/VisuallyHidden";

export const meta: MetaFunction = ({ parentsData, params }) => {
  const projectName = getProjectMetaTitle(parentsData);
  const envName = getEnvMetaTitle(parentsData, params.env);
  const flagName = getFlagMetaTitle(parentsData);

  return {
    title: `Progressively | ${projectName} | ${envName} | ${flagName} | Insights`,
  };
};

type ActionDataType = null | { successChangePercentage: boolean };

export const action: ActionFunction = async ({
  request,
  params,
}): Promise<ActionDataType> => {
  const session = await getSession(request.headers.get("Cookie"));
  const authCookie = session.get("auth-cookie");
  const formData = await request.formData();
  const type = formData.get("_type");

  if (type === "toggle-flag") {
    return toggleFlagAction(formData, params, authCookie);
  }

  return null;
};
interface VariantHit {
  variant: string;
  evaluations: number;
  metrics: Array<{ count: number; metric: string }>;
}

interface LoaderData {
  hits: Array<VariantHit>;
  startDate: string;
  endDate: string;
}

export const loader: LoaderFunction = async ({
  request,
  params,
}): Promise<LoaderData> => {
  const session = await getSession(request.headers.get("Cookie"));
  const url = new URL(request.url);
  const search = new URLSearchParams(url.search);

  const startDateForm = search.get("startDate");
  const endDateForm = search.get("endDate");

  const start = new Date();
  start.setDate(start.getDate() - 7);

  const startDate = startDateForm ? new Date(startDateForm) : start;
  const endDate = endDateForm ? new Date(endDateForm) : new Date();

  const authCookie = session.get("auth-cookie");
  const hitsPerFlags: Array<VariantHit> = await getFlagHits(
    params.env!,
    params.flagId!,
    startDate,
    endDate,
    authCookie
  );

  return {
    hits: hitsPerFlags,
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
  };
};

const InsightsGrid = styled("div", {
  display: "grid",
  gap: "$spacing$8",
  gridTemplateColumns: "1fr 1fr 1fr",

  "@tablet": {
    gridTemplateColumns: "1fr",
  },
});

const formatDefaultDate = (isoDate: string) => {
  return isoDate.slice(0, 10);
};

export default function FlagInsights() {
  const { hits, startDate, endDate } = useLoaderData<LoaderData>();
  const { flagEnv } = useFlagEnv();
  const { user } = useUser();
  const { project } = useProject();
  const { environment } = useEnvironment();

  const currentFlag = flagEnv.flag;
  const isFlagActivated = flagEnv.status === FlagStatus.ACTIVATED;

  return (
    <DashboardLayout
      user={user}
      header={
        <Header
          tagline={<TagLine icon={<FlagIcon />}>FEATURE FLAG</TagLine>}
          title={currentFlag.name}
          startAction={
            <Form method="post" id={`form-${currentFlag.uuid}`}>
              <ToggleFlag
                isFlagActivated={isFlagActivated}
                flagId={currentFlag.uuid}
                flagName={currentFlag.name}
              />
            </Form>
          }
        />
      }
      subNav={
        <FlagMenu
          projectId={project.uuid}
          envId={environment.uuid}
          flagId={currentFlag.uuid}
        />
      }
    >
      <PageTitle
        value="Insights"
        icon={<AiOutlineBarChart />}
        description={
          <Typography>
            Information about variants hits per date on the feature flag.
          </Typography>
        }
      />

      <Stack spacing={8}>
        <Form action=".">
          <HStack
            spacing={4}
            alignItems={{ "@initial": "flex-end", "@mobile": "none" }}
            direction={{ "@mobile": "column" }}
          >
            <TextInput
              type="date"
              name={"startDate"}
              label={"Start date"}
              defaultValue={formatDefaultDate(startDate)}
            />
            <TextInput
              type="date"
              name={"endDate"}
              label={"End date"}
              defaultValue={formatDefaultDate(endDate)}
            />
            <SubmitButton>Filter on date</SubmitButton>
          </HStack>
        </Form>

        <InsightsGrid>
          <div></div>
        </InsightsGrid>

        <section
          aria-label={`Hits per date and per variant (${0}) evaluations in the current date range`}
        >
          {hits.map((hit) => (
            <Card key={hit.variant}>
              <div>Variant: {hit.variant}</div>
              <div>All hits: {hit.evaluations}</div>
              {hit.metrics.map((metric) => (
                <div key={metric.metric}>
                  {metric.metric} {metric.count}
                </div>
              ))}
            </Card>
          ))}

          <Card>
            {hits.length > 0 ? (
              <div>
                <VisuallyHidden>
                  <h2>
                    Hits per date and per variant ({0}) evaluations in the
                    current date range
                  </h2>
                </VisuallyHidden>
              </div>
            ) : (
              <CardContent>
                <EmptyState
                  titleAs="h2"
                  title="No hits found"
                  description={
                    <Typography>
                      There is no flag hit for this period.
                    </Typography>
                  }
                />
              </CardContent>
            )}
          </Card>
        </section>
      </Stack>
    </DashboardLayout>
  );
}
