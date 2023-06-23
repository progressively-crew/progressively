import { V2_MetaFunction } from "@remix-run/node";
import { useProject } from "~/modules/projects/contexts/useProject";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { getEnvMetaTitle } from "~/modules/environments/services/getEnvMetaTitle";
import { useFlagEnv } from "~/modules/flags/contexts/useFlagEnv";
import { getFlagEnvMetaTitle } from "~/modules/flags/services/getFlagEnvMetaTitle";
import { Button } from "~/components/Buttons/Button";
import { BackLink } from "~/components/BackLink";
import { CreateEntityLayout } from "~/layouts/CreateEntityLayout";
import { CreateEntityTitle } from "~/layouts/CreateEntityTitle";
import { Typography } from "~/components/Typography";
import { ButtonCopy } from "~/components/ButtonCopy";
import { Spacer } from "~/components/Spacer";
import { Link } from "~/components/Link";

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

export default function FlagInsights() {
  const { flagEnv } = useFlagEnv();
  const { project } = useProject();

  const clientKey = flagEnv.environment.clientKey;
  const flagKey = flagEnv.flag.key;

  return (
    <CreateEntityLayout
      titleSlot={<CreateEntityTitle>Developper setup</CreateEntityTitle>}
      submitSlot={
        <Button
          variant="primary"
          to={`/dashboard/projects/${project.uuid}/environments/${flagEnv.environment.uuid}/flags/${flagEnv.flag.uuid}`}
        >
          Thank you
        </Button>
      }
      backLinkSlot={
        <BackLink
          to={`/dashboard/projects/${project.uuid}/environments/${flagEnv.environment.uuid}/flags/${flagEnv.flag.uuid}`}
        >
          Back to flag audience
        </BackLink>
      }
    >
      <Typography>
        To setup Progressively in your project, you will need to get a client
        key and a flag key.
      </Typography>

      <Spacer size={6} />

      <Typography>
        The client key for <strong>{project.name}</strong> in{" "}
        <strong>{flagEnv.environment.name}</strong>:
      </Typography>

      <Spacer size={2} />

      <ButtonCopy toCopy={flagEnv.environment.clientKey}>
        {flagEnv.environment.clientKey}
      </ButtonCopy>

      <Spacer size={6} />

      <Typography>
        The flag key for <strong>{flagEnv.flag.name}</strong>:
      </Typography>

      <Spacer size={2} />

      <ButtonCopy toCopy={flagEnv.environment.clientKey}>
        {flagEnv.flag.key}
      </ButtonCopy>

      <Spacer size={6} />

      <Typography>
        You can check{" "}
        <Link href="https://docs.progressively.app/" target="_blank">
          the documentation
        </Link>{" "}
        for additional details.
      </Typography>
    </CreateEntityLayout>
  );
}
