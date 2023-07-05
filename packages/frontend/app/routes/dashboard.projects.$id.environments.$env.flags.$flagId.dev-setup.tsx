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
import { useUser } from "~/modules/user/contexts/useUser";
import { useEnvironment } from "~/modules/environments/contexts/useEnvironment";
import { PageTitle } from "~/components/PageTitle";

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
    <div className="shrink-0 w-12 h-12 rounded-full text-lg border border-slate-200 flex items-center justify-center">
      <Typography as="span">{children}</Typography>
    </div>
  );
};

export default function DevSetup() {
  const { flagEnv } = useFlagEnv();
  const { project } = useProject();
  const { user } = useUser();
  const { environment } = useEnvironment();

  const liClass = "flex flex-row gap-4";
  const titleClass = "leading-relaxed text-3xl font-bold";
  const pClass = "leading-relaxed text-lg pb-2 text-slate-700";

  return (
    <DashboardLayout
      user={user}
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
          <div className="pt-2" aria-hidden>
            <NumberCircle>1</NumberCircle>
          </div>
          <div>
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
          </div>
        </li>
        <li className={liClass}>
          <div className="pt-2" aria-hidden>
            <NumberCircle>2</NumberCircle>
          </div>
          <div>
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
          </div>
        </li>
        <li className={liClass}>
          <div className="pt-2" aria-hidden>
            <NumberCircle>3</NumberCircle>
          </div>
          <div>
            <Typography className={titleClass}>
              Check the SDK setup in the documentation
            </Typography>
            <Typography className={pClass}>
              <Link href="https://docs.progressively.app/" target="_blank">
                Access the documentation
              </Link>{" "}
              and take the SDK that fits your need.
            </Typography>
          </div>
        </li>
      </ol>
    </DashboardLayout>
  );
}
