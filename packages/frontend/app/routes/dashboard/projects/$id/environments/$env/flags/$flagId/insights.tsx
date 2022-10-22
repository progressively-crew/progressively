import { DashboardLayout } from "~/layouts/DashboardLayout";
import { FlagStatus } from "~/modules/flags/types";
import { getSession } from "~/sessions";
import { Header } from "~/components/Header";
import { AiOutlineBarChart } from "react-icons/ai";
import { getFlagHits } from "~/modules/flags/services/getFlagHits";
import { ToggleFlag } from "~/modules/flags/components/ToggleFlag";
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
import { Section, SectionHeader } from "~/components/Section";
import { RawTable } from "~/components/RawTable";
import { BigStat } from "~/components/BigStat";
import { useRef } from "react";
import { Tag } from "~/components/Tag";

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

interface MetricHit {
  count: number;
  metric: string;
}
interface VariantHit {
  count: number;
  metric: string;
  variant: string;
  variantEvalutations: number;
}

interface LoaderData {
  hits: Array<VariantHit>;
  hitsWithoutVariant: Array<MetricHit>;
  startDate: string;
  endDate: string;
  variantEvalutations: Array<{
    variant: string;
    count: number;
  }>;
}

const TableWrapper = styled("div", {
  "& table tbody tr td": {
    height: "$cta",
  },
});

const InsightsGrid = styled("div", {
  display: "grid",
  gap: "$spacing$8",
  gridTemplateColumns: "1fr 1fr 1fr",

  "@tablet": {
    gridTemplateColumns: "1fr",
  },
});

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

  const end = new Date();
  end.setDate(end.getDate() + 1);

  const startDate = startDateForm ? new Date(startDateForm) : start;
  const endDate = endDateForm ? new Date(endDateForm) : end;

  const authCookie = session.get("auth-cookie");
  const {
    hitsPerVariant,
    hitsWithoutVariant,
  }: {
    hitsPerVariant: Array<VariantHit>;
    hitsWithoutVariant: Array<MetricHit>;
  } = await getFlagHits(
    params.env!,
    params.flagId!,
    startDate,
    endDate,
    authCookie
  );

  const variantHitsWithDuplicates = hitsPerVariant.map((hit) => ({
    variant: hit.variant,
    count: hit.variantEvalutations,
  }));

  const alreadyInVariants: any = {};

  const variantEvalutations = variantHitsWithDuplicates.filter((item) => {
    if (!alreadyInVariants[item.variant]) {
      alreadyInVariants[item.variant] = true;
      return true;
    }
    return false;
  });

  return {
    variantEvalutations,
    hits: hitsPerVariant,
    hitsWithoutVariant,
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
  };
};

const formatDefaultDate = (isoDate: string) => {
  return isoDate.slice(0, 10);
};

export default function FlagInsights() {
  const { hits, startDate, endDate, hitsWithoutVariant, variantEvalutations } =
    useLoaderData<LoaderData>();
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
          {variantEvalutations.map((variant) => (
            <Card key={variant.variant}>
              <CardContent>
                <BigStat
                  count={variant.count}
                  unit="evalutations"
                  name={`Variant ${variant.variant}`}
                />
              </CardContent>
            </Card>
          ))}
        </InsightsGrid>

        <Card>
          <Section id="with-variant">
            <CardContent noBottom>
              <SectionHeader title="Hits by variant" />
            </CardContent>

            <TableWrapper>
              <RawTable>
                <thead>
                  <tr>
                    <th>Metric</th>
                    <th>Variant</th>
                    <th>Metric hit</th>
                    <th>Variant evalutations</th>
                    <th>Ratio</th>
                  </tr>
                </thead>
                <tbody>
                  {hits.map((hit) => (
                    <tr key={hit.metric}>
                      <td>{hit.metric}</td>
                      <td>{hit.variant}</td>
                      <td>
                        <Typography
                          as="span"
                          fontWeight="bold"
                          fontSize="uranus"
                        >
                          {hit.count}
                        </Typography>
                      </td>
                      <td>
                        <Typography
                          as="span"
                          fontWeight="bold"
                          color="nemesis"
                          fontSize="uranus"
                        >
                          {hit.variantEvalutations}
                        </Typography>
                      </td>
                      <td>
                        <Tag color="successFg" background="successBg">
                          {hit.variantEvalutations > 0
                            ? `${Math.round(
                                (hit.count / hit.variantEvalutations) * 100
                              )}%`
                            : "N/A"}
                        </Tag>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </RawTable>
            </TableWrapper>
          </Section>
        </Card>

        <Card>
          <Section id="without-variant">
            <CardContent noBottom>
              <SectionHeader title="Other hits" />
            </CardContent>

            <TableWrapper>
              <RawTable>
                <thead>
                  <tr>
                    <th>Metric</th>
                    <th>Metric hit</th>
                  </tr>
                </thead>
                <tbody>
                  {hitsWithoutVariant.map((hit) => (
                    <tr key={hit.metric}>
                      <td>{hit.metric}</td>
                      <td>
                        <Typography
                          as="span"
                          fontWeight="bold"
                          fontSize="uranus"
                        >
                          {hit.count}
                        </Typography>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </RawTable>
            </TableWrapper>
          </Section>
        </Card>

        <section
          aria-label={`Hits per date and per variant (${0}) evaluations in the current date range`}
        >
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
