import { DashboardLayout } from "~/layouts/DashboardLayout";
import { getSession } from "~/sessions";
import { getFlagHits } from "~/modules/flags/services/getFlagHits";
import { LoaderFunction, ActionFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { TbApps } from "react-icons/tb";
import { FlagMenu } from "~/modules/flags/components/FlagMenu";
import { useProject } from "~/modules/projects/contexts/useProject";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { Card, CardContent } from "~/components/Card";
import { PageTitle } from "~/components/PageTitle";
import { Section, SectionHeader } from "~/components/Section";
import { EmptyState } from "~/components/EmptyState";
import { toggleFlagAction } from "~/modules/flags/form-actions/toggleFlagAction";
import { BigStat } from "~/components/BigStat";
import { VariantDot } from "~/modules/variants/components/VariantDot";
import { InsightsFilters } from "~/modules/projects/components/InsightsFilters";
import { useFlag } from "~/modules/flags/contexts/useFlag";
import { getFlagMetaTitle } from "~/modules/flags/services/getFlagMetaTitle";
import { BarChart2 } from "~/components/BarChart2";
import { LineChart } from "~/components/LineChart";

export const meta: MetaFunction = ({ matches }) => {
  const projectName = getProjectMetaTitle(matches);
  const flagName = getFlagMetaTitle(matches);

  return [
    {
      title: `Progressively | ${projectName} | ${flagName} | Insights`,
    },
  ];
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const url = new URL(request.url);
  const search = new URLSearchParams(url.search);

  const strDays = search.get("days");
  let day = Number(strDays);
  if (!day || Number.isNaN(day)) {
    day = 7;
  }

  const authCookie = session.get("auth-cookie");
  const { hitsPerVariantPerDate: hitsPerVariantPerDateData, flagEvaluations } =
    await getFlagHits(params.flagId!, day, authCookie);

  const dateDict: Record<any, any> = {};
  let flagEvaluationsCount: number = 0;

  for (const ev of hitsPerVariantPerDateData) {
    if (!dateDict[ev.date]) {
      dateDict[ev.date] = {};
    }

    flagEvaluationsCount += ev.count;
    dateDict[ev.date][ev.valueResolved] = ev.count;
  }

  const hitsPerVariantPerDate = Object.keys(dateDict).map((date) => ({
    date,
    ...dateDict[date],
  }));

  return {
    flagEvaluationsCount,
    flagEvaluations,
    hitsPerVariantPerDate,
  };
};

export const action: ActionFunction = async ({ request, params }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const authCookie = session.get("auth-cookie");
  const formData = await request.formData();
  const type = formData.get("_type");

  if (type === "toggle-flag") {
    return toggleFlagAction(formData, params, authCookie);
  }

  return null;
};

export default function FlagInsights() {
  const { hitsPerVariantPerDate, flagEvaluations, flagEvaluationsCount } =
    useLoaderData<typeof loader>();
  const { flag } = useFlag();
  const { project } = useProject();

  return (
    <DashboardLayout subNav={<FlagMenu projectId={project.uuid} flag={flag} />}>
      <PageTitle value="Insights" action={<InsightsFilters />} />

      <Section>
        <div className="grid grid-cols-2 md:inline-flex flex-row gap-6">
          <BigStat
            label={"Total Flag eval. count"}
            value={flagEvaluationsCount}
            unit={"evals."}
            icon={<TbApps className="h-6 w-6 text-slate-200" />}
            detail="100%"
          />

          {flagEvaluations.map((flagEval) => (
            <BigStat
              key={flagEval.valueResolved}
              label={flagEval.valueResolved}
              value={flagEval.count}
              unit={"evals."}
              icon={<VariantDot variant={flagEval.valueResolved} size="L" />}
              detail={`${
                Math.round((flagEval.count / flagEvaluationsCount) * 10_000) /
                100
              }%`}
            />
          ))}
        </div>
      </Section>

      <Section id="variant-evaluations">
        <Card>
          <CardContent>
            <SectionHeader title={"Flag eval."} />
          </CardContent>

          {hitsPerVariantPerDate.length > 0 ? (
            <LineChart data={hitsPerVariantPerDate} />
          ) : (
            <CardContent>
              <EmptyState
                title="No data"
                description={"There are no flag evaluations for this period."}
              />
            </CardContent>
          )}
        </Card>
      </Section>
    </DashboardLayout>
  );
}
