import { V2_MetaFunction } from "@remix-run/node";
import { useProject } from "~/modules/projects/contexts/useProject";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { getEnvMetaTitle } from "~/modules/environments/services/getEnvMetaTitle";
import { useFlagEnv } from "~/modules/flags/contexts/useFlagEnv";
import { getFlagEnvMetaTitle } from "~/modules/flags/services/getFlagEnvMetaTitle";
import { Typography } from "~/components/Typography";
import { ButtonCopy } from "~/components/ButtonCopy";
import { Link } from "~/components/Link";
import { DashboardLayout } from "~/layouts/DashboardLayout";
import { FlagEnvMenu } from "~/modules/flags/components/FlagEnvMenu";
import { useEnvironment } from "~/modules/environments/contexts/useEnvironment";
import { PageTitle } from "~/components/PageTitle";
import { Card, CardContent } from "~/components/Card";

export const meta: V2_MetaFunction = ({ matches, params }) => {
  const projectName = getProjectMetaTitle(matches);
  const envName = getEnvMetaTitle(matches, params.env!);
  const flagName = getFlagEnvMetaTitle(matches);

  return [
    {
      title: `Progressively | ${projectName} | ${envName} | ${flagName} | Dev setup`,
    },
  ];
};

interface NumberCircleProps {
  children: React.ReactNode;
}

const NumberCircle = ({ children }: NumberCircleProps) => {
  return (
    <div className="shrink-0 w-12 h-12 rounded-full text-lg border-2 border-slate-200 flex items-center justify-center font-bold">
      <Typography as="span">{children}</Typography>
    </div>
  );
};

export default function DevSetup() {
  const { flagEnv } = useFlagEnv();
  const { project } = useProject();
  const { environment } = useEnvironment();

  const liClass = "flex flex-row gap-4 items-center";
  const titleClass = "leading-relaxed text-3xl font-bold";
  const pClass = "leading-relaxed text-lg pb-2 text-slate-700";

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
        value="Dev setup"
        description={
          <Typography>
            The information related to setting up Progressively in your
            codebase.
          </Typography>
        }
      />

      <ol className="flex flex-col gap-8">
        <li className={liClass}>
          <div aria-hidden>
            <NumberCircle>1</NumberCircle>
          </div>
          <Card>
            <CardContent>
              <Typography as="h2" className={titleClass}>
                Get your client key
              </Typography>
              <Typography className={pClass}>
                A client key is an auto generated identifier for{" "}
                <strong>an environment</strong>. Thanks to this identifier, the
                SDKs know on which environment they should evaluate your feature
                flags
              </Typography>

              <ButtonCopy toCopy={flagEnv.environment.clientKey}>
                {flagEnv.environment.clientKey}
              </ButtonCopy>
            </CardContent>
          </Card>
        </li>
        <li className={liClass}>
          <div aria-hidden>
            <NumberCircle>2</NumberCircle>
          </div>

          <Card>
            <CardContent>
              <Typography className={titleClass}>
                Get your feature flag key
              </Typography>
              <Typography className={pClass}>
                The feature flag key is the value on which you will make your
                conditional statements in the codebase.
              </Typography>
              <ButtonCopy toCopy={flagEnv.flag.key}>
                {flagEnv.flag.key}
              </ButtonCopy>
            </CardContent>
          </Card>
        </li>
        <li className={liClass}>
          <div aria-hidden>
            <NumberCircle>3</NumberCircle>
          </div>

          <Card>
            <CardContent>
              <Typography className={titleClass}>
                Check the SDK setup in the documentation
              </Typography>
              <Typography className={pClass}>
                <Link href="https://docs.progressively.app/" target="_blank">
                  Access the documentation
                </Link>{" "}
                and take the SDK that fits your need.
              </Typography>
            </CardContent>
          </Card>
        </li>
      </ol>
    </DashboardLayout>
  );
}
