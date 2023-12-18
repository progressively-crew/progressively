import { DashboardLayout } from "~/layouts/DashboardLayout";
import {
  ActionFunction,
  LoaderFunction,
  V2_MetaFunction,
  redirect,
} from "@remix-run/node";
import { useProject } from "~/modules/projects/contexts/useProject";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { getEnvMetaTitle } from "~/modules/environments/services/getEnvMetaTitle";
import { getFlagEnvMetaTitle } from "~/modules/flags/services/getFlagEnvMetaTitle";
import { Card, CardContent } from "~/components/Card";
import { PageTitle } from "~/components/PageTitle";
import { Section, SectionHeader } from "~/components/Section";
import { getSession } from "~/sessions";
import { ProjectNavBar } from "~/modules/projects/components/ProjectNavBar";
import { InsightsFilters } from "~/modules/projects/components/InsightsFilters";
import { BarChart } from "~/components/BarChart";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { FormGroup } from "~/components/Fields/FormGroup";
import { SubmitButton } from "~/components/Buttons/SubmitButton";
import { SelectField } from "~/components/Fields/Select/SelectField";
import { getDistinctEventName } from "~/modules/environments/services/getDistinctEventName";
import { Flag } from "~/modules/flags/types";
import { getProjectFlags } from "~/modules/projects/services/getProjectFlags";

export const meta: V2_MetaFunction = ({ matches, params }) => {
  const projectName = getProjectMetaTitle(matches);
  const envName = getEnvMetaTitle(matches, params.env!);
  const flagName = getFlagEnvMetaTitle(matches);

  return [
    {
      title: `Progressively | ${projectName} | ${envName} | ${flagName} | Funnels`,
    },
  ];
};

interface ActionData {
  allEvents?: Array<string>;
}

export const action: ActionFunction = async ({
  request,
}): Promise<ActionData | Response> => {
  const formData = await request.formData();
  const type = formData.get("_type");

  if (type === "add-metric-name") {
    const eventName = formData.get("event-name")?.toString() || "";
    const allEvents = (formData.getAll("event") || []).map((x) => x.toString());

    allEvents.push(eventName);

    return { allEvents };
  }

  if (type === "set-flag") {
    return {};
  }

  return {};
};

interface LoaderData {
  distinctEventName: Array<string>;
  flags: Array<Flag>;
}

export const loader: LoaderFunction = async ({
  request,
  params,
}): Promise<LoaderData> => {
  const session = await getSession(request.headers.get("Cookie"));
  const url = new URL(request.url);
  const search = new URLSearchParams(url.search);
  const envId = search.get("envId");

  if (!envId) {
    throw redirect("/401");
  }

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
  const flags: Array<Flag> = await getProjectFlags(params.id!, authCookie);
  const { distinctEventName } = await getDistinctEventName(
    envId!,
    start,
    end,
    authCookie
  );

  return { distinctEventName, flags };
};

export default function FunnelsPage() {
  const { project } = useProject();
  const { distinctEventName, flags } = useLoaderData<LoaderData>();
  const actionData = useActionData<ActionData>();
  const allEvents = actionData?.allEvents || [];

  const selectOptions = distinctEventName
    .filter((eventName) => !allEvents.includes(eventName))
    .map((eventName) => ({
      value: eventName,
      label: eventName,
    }));

  const flagOptions = flags.map((flag) => ({
    label: flag.name,
    value: flag.uuid,
  }));

  return (
    <DashboardLayout subNav={<ProjectNavBar project={project} />}>
      <PageTitle
        value="Funnels"
        action={
          <InsightsFilters
            projectId={project.uuid}
            environments={project.environments}
          />
        }
      />

      <Section>
        <Card>
          <CardContent>
            <SectionHeader title="Page views / browser" />
          </CardContent>

          <BarChart
            data={allEvents.map((ev) => ({
              eventName: ev,
              count: Math.random() * 1000,
            }))}
          />

          <CardContent>
            <Form method="POST">
              {allEvents.map((ev) => (
                <input type="hidden" value={ev} name="event" key={ev} />
              ))}

              <div className="grid grid-cols-2 gap-8">
                <FormGroup>
                  <input type="hidden" name="_type" value="set-flag" />

                  <SelectField
                    name="flag-name"
                    label="Feature flag"
                    options={flagOptions}
                  />

                  <SubmitButton variant="secondary">Set flag</SubmitButton>
                </FormGroup>

                <FormGroup>
                  <input type="hidden" name="_type" value="add-metric-name" />

                  <SelectField
                    name="event-name"
                    label="Event"
                    options={selectOptions}
                  />
                  <SubmitButton variant="secondary">Add metric</SubmitButton>
                </FormGroup>
              </div>
            </Form>
          </CardContent>
        </Card>
      </Section>
    </DashboardLayout>
  );
}
