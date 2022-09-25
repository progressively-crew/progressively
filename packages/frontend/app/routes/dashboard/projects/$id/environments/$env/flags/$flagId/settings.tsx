import { BreadCrumbs } from "~/components/Breadcrumbs";
import { DashboardLayout } from "~/layouts/DashboardLayout";
import { FlagStatus } from "~/modules/flags/types";
import { UserRoles } from "~/modules/projects/types";
import { getSession } from "~/sessions";
import { Header } from "~/components/Header";
import { Section, SectionHeader } from "~/components/Section";
import { AiOutlineSetting } from "react-icons/ai";
import { ToggleFlag } from "~/modules/flags/components/ToggleFlag";
import { Typography } from "~/components/Typography";
import { DeleteButton } from "~/components/Buttons/DeleteButton";
import { Crumbs } from "~/components/Breadcrumbs/types";
import { HideMobile } from "~/components/HideMobile";
import { VisuallyHidden } from "~/components/VisuallyHidden";
import { MetaFunction, ActionFunction } from "@remix-run/node";
import { Card, CardContent } from "~/components/Card";
import { Stack } from "~/components/Stack";
import { TagLine } from "~/components/Tagline";
import { FlagMenu } from "~/modules/flags/components/FlagMenu";
import { ButtonCopy } from "~/components/ButtonCopy";
import { useProject } from "~/modules/projects/contexts/useProject";
import { useUser } from "~/modules/user/contexts/useUser";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { useEnvironment } from "~/modules/environments/contexts/useEnvironment";
import { getEnvMetaTitle } from "~/modules/environments/services/getEnvMetaTitle";
import { useFlagEnv } from "~/modules/flags/contexts/useFlagEnv";
import { getFlagMetaTitle } from "~/modules/flags/services/getFlagMetaTitle";
import { toggleFlagAction } from "~/modules/flags/form-actions/toggleFlagAction";
import { PageTitle } from "~/components/PageTitle";
import { FlagIcon } from "~/components/Icons/FlagIcon";

export const meta: MetaFunction = ({ parentsData, params }) => {
  const projectName = getProjectMetaTitle(parentsData);
  const envName = getEnvMetaTitle(parentsData, params.env);
  const flagName = getFlagMetaTitle(parentsData);

  return {
    title: `Progressively | ${projectName} | ${envName} | ${flagName} | Settings`,
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

export default function FlagSettingPage() {
  const { project, userRole } = useProject();
  const { user } = useUser();
  const { flagEnv } = useFlagEnv();

  const { environment } = useEnvironment();

  const currentFlag = flagEnv.flag;
  const isFlagActivated = flagEnv.status === FlagStatus.ACTIVATED;

  const crumbs: Crumbs = [
    {
      link: "/dashboard",
      label: "Projects",
      isRoot: true,
    },
    {
      link: `/dashboard/projects/${project.uuid}`,
      label: project.name,
      isProject: true,
    },
    {
      link: `/dashboard/projects/${project.uuid}/environments/${environment.uuid}`,
      label: environment.name,
      isEnv: true,
    },
    {
      link: `/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}`,
      label: currentFlag.name,
      isFlag: true,
      forceNotCurrent: true,
    },
  ];

  return (
    <DashboardLayout
      user={user}
      breadcrumb={<BreadCrumbs crumbs={crumbs} />}
      header={
        <Header
          tagline={<TagLine icon={<FlagIcon />}>FEATURE FLAG</TagLine>}
          title={currentFlag.name}
          startAction={
            <ToggleFlag
              isFlagActivated={isFlagActivated}
              flagId={currentFlag.uuid}
            />
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
      <PageTitle value="Settings" icon={<AiOutlineSetting />} />

      <Stack spacing={8}>
        <Card>
          <CardContent>
            <Section id="general">
              <SectionHeader
                title="General"
                description={
                  <Typography>
                    The following is the flag key to use inside your application
                    to get the flag variation
                  </Typography>
                }
              />

              <ButtonCopy toCopy={currentFlag.key}>
                {currentFlag.key}
              </ButtonCopy>
            </Section>
          </CardContent>
        </Card>

        {userRole === UserRoles.Admin && (
          <Card>
            <CardContent>
              <Section id="danger">
                <SectionHeader
                  title="Danger zone"
                  titleAs="h3"
                  description={
                    <Typography>
                      You can delete a feature flag at any time, but you{" "}
                      {`won’t`} be able to access its insights anymore and false
                      will be served to the application using it.
                    </Typography>
                  }
                />

                <div>
                  <DeleteButton
                    to={`/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}/delete`}
                  >
                    <span>
                      <span aria-hidden>
                        Delete{" "}
                        <HideMobile>{currentFlag.name} forever</HideMobile>
                      </span>

                      <VisuallyHidden>
                        Delete {currentFlag.name} forever
                      </VisuallyHidden>
                    </span>
                  </DeleteButton>
                </div>
              </Section>
            </CardContent>
          </Card>
        )}
      </Stack>
    </DashboardLayout>
  );
}
