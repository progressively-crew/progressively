import { DashboardLayout } from "~/layouts/DashboardLayout";
import { getSession } from "~/sessions";
import { getFlagHits } from "~/modules/flags/services/getFlagHits";
import {
  LoaderFunction,
  ActionFunction,
  V2_MetaFunction,
} from "@remix-run/node";
import { Link, useLoaderData, useSearchParams } from "@remix-run/react";
import { TbApps } from "react-icons/tb";
import { FlagEnvMenu } from "~/modules/flags/components/FlagEnvMenu";
import { useProject } from "~/modules/projects/contexts/useProject";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { useEnvironment } from "~/modules/environments/contexts/useEnvironment";
import { getEnvMetaTitle } from "~/modules/environments/services/getEnvMetaTitle";
import { useFlagEnv } from "~/modules/flags/contexts/useFlagEnv";
import { getFlagEnvMetaTitle } from "~/modules/flags/services/getFlagEnvMetaTitle";
import { Card, CardContent } from "~/components/Card";
import { PageTitle } from "~/components/PageTitle";
import { Section, SectionHeader } from "~/components/Section";
import { EmptyState } from "~/components/EmptyState";
import { LineChart } from "~/components/LineChart";
import { toggleFlagAction } from "~/modules/flags/form-actions/toggleFlagAction";
import { Typography } from "~/components/Typography";
import { VariantEvalList } from "~/modules/insights/components/VariantEvalList";
import { BigStat } from "~/components/BigStat";
import { VariantDot } from "~/modules/variants/components/VariantDot";

export const meta: V2_MetaFunction = ({ matches, params }) => {
  const projectName = getProjectMetaTitle(matches);
  const envName = getEnvMetaTitle(matches, params.env!);
  const flagName = getFlagEnvMetaTitle(matches);

  return [
    {
      title: `Progressively | ${projectName} | ${envName} | ${flagName} | Insights`,
    },
  ];
};

type FlagHit = {
  [key: string]: number;
} & { date: string };

interface FlagEvaluation {
  valueResolved: string;
  _count: number;
}

interface LoaderData {
  flagEvaluationsCount: number;
  hitsPerVariantPerDate: Array<FlagHit>;
  flagEvaluations: Array<FlagEvaluation>;
}

export const loader: LoaderFunction = async ({
  request,
  params,
}): Promise<LoaderData> => {
  const session = await getSession(request.headers.get("Cookie"));
  const url = new URL(request.url);
  const search = new URLSearchParams(url.search);

  const strDays = search.get("days");
  let day = Number(strDays);
  if (!day || Number.isNaN(day)) {
    day = 7;
  }

  const start = new Date();
  start.setDate(start.getDate() - day);

  const end = new Date();
  end.setDate(end.getDate() + 1);

  const authCookie = session.get("auth-cookie");
  const {
    hitsPerVariantPerDate,
    flagEvaluations,
  }: {
    hitsPerVariantPerDate: Array<FlagHit>;
    flagEvaluations: Array<FlagEvaluation>;
  } = await getFlagHits(params.env!, params.flagId!, start, end, authCookie);

  const flagEvaluationsCount = flagEvaluations.reduce(
    (acc, curr) => acc + curr._count,
    0
  );

  return {
    flagEvaluationsCount,
    flagEvaluations,
    hitsPerVariantPerDate,
  };
};

type ActionDataType = null | {
  errors?: { [key: string]: string | undefined };
};

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

export default function FlagInsights() {
  const { hitsPerVariantPerDate, flagEvaluations, flagEvaluationsCount } =
    useLoaderData<LoaderData>();
  const { flagEnv } = useFlagEnv();
  const { project } = useProject();
  const { environment } = useEnvironment();
  const [searchParams] = useSearchParams();

  const days = searchParams.get("days") || "7";

  const shareButtonClass =
    "h-10 px-4 gap-4 bg-transparent hover:bg-slate-100 dark:border-slate-600 dark:text-slate-100 dark:hover:bg-slate-600 relative whitespace-nowrap inline-flex items-center justify-center rounded-sm text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 dark:focus:ring-slate-400 disabled:pointer-events-none dark:focus:ring-offset-slate-900";

  const activeClass = `!bg-slate-100`;

  return (
    <DashboardLayout
      subNav={
        <FlagEnvMenu
          projectId={project.uuid}
          envId={environment.uuid}
          flagEnv={flagEnv}
        />
      }
    >
      <PageTitle
        value="Insights"
        description={
          <Typography>
            The events (flag evaluations and metric hits) are stored for{" "}
            <strong>90 days</strong> and erased after this period.
          </Typography>
        }
      />

      <div className="inline-flex">
        <Card>
          <div className="inline-flex flex-row gap-1 p-1">
            <Link
              to="?days=7"
              className={`${shareButtonClass} ${
                days === "7" ? activeClass : ""
              }`}
            >
              7 days
            </Link>

            <Link
              to="?days=30"
              className={`${shareButtonClass} ${
                days === "30" ? activeClass : ""
              }`}
            >
              30 days
            </Link>

            <Link
              to="?days=90"
              className={`${shareButtonClass} ${
                days === "90" ? activeClass : ""
              }`}
            >
              90 days
            </Link>
          </div>
        </Card>
      </div>

      <Section>
        <div className="inline-flex flex-row gap-2">
          <BigStat
            label={"Flag eval. count"}
            value={flagEvaluationsCount}
            unit={"evals."}
            icon={<TbApps className="h-6 w-6 text-slate-200" />}
          />

          {flagEvaluations.map((flagEval) => (
            <BigStat
              key={flagEval.valueResolved}
              label={flagEval.valueResolved}
              value={flagEval._count}
              unit={"evals."}
              icon={<VariantDot variant={flagEval.valueResolved} size="L" />}
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
            <div>
              <div className="pb-2 -mx-1">
                <LineChart data={hitsPerVariantPerDate} />
              </div>
              <VariantEvalList
                flagEvaluations={flagEvaluations}
                flagEvaluationsCount={flagEvaluationsCount}
              />
            </div>
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
