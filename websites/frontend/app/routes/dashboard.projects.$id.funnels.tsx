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
import {
  Form,
  useActionData,
  useLoaderData,
  useSearchParams,
} from "@remix-run/react";
import { FormGroup } from "~/components/Fields/FormGroup";
import { SubmitButton } from "~/components/Buttons/SubmitButton";
import { SelectField } from "~/components/Fields/Select/SelectField";
import { getDistinctEventName } from "~/modules/environments/services/getDistinctEventName";
import { Flag } from "~/modules/flags/types";
import { getProjectFlags } from "~/modules/projects/services/getProjectFlags";
import { getAllFlagHitsForRange } from "~/modules/flags/services/getAllFlagHitsForRange";
import { Variant } from "~/modules/variants/types";
import { getVariants } from "~/modules/variants/services/getVariants";

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
  const type = formData.get("_type")?.toString();

  if (type === "add-metric-name") {
    const eventName = formData.get("event-name")?.toString() || "";
    const allEvents = (formData.getAll("event") || []).map((x) => x.toString());

    allEvents.push(eventName);

    return { allEvents };
  }

  return {};
};

interface LoaderData {
  distinctEventName: Array<string>;
  flags: Array<Flag>;
  variants: Array<Variant>;
  allFlagHitsForRange: number;
}

export const loader: LoaderFunction = async ({
  request,
  params,
}): Promise<LoaderData> => {
  const session = await getSession(request.headers.get("Cookie"));
  const url = new URL(request.url);
  const search = new URLSearchParams(url.search);
  const envId = search.get("envId");
  const flagId = search.get("flagId");
  const variant = search.get("variant");

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

  let allFlagHitsForRange = 0;
  let variants: Array<Variant> = [];

  if (flagId) {
    if (variant) {
      const { hitsForRange } = await getAllFlagHitsForRange(
        envId,
        flagId,
        variant,
        start,
        end,
        authCookie
      );

      allFlagHitsForRange = hitsForRange;
    }

    variants = await getVariants(envId, flagId, authCookie);
  }

  const flags: Array<Flag> = await getProjectFlags(params.id!, authCookie);
  const { distinctEventName } = await getDistinctEventName(
    envId!,
    start,
    end,
    authCookie
  );

  return { distinctEventName, flags, allFlagHitsForRange, variants };
};

export default function FunnelsPage() {
  const { project } = useProject();
  const { distinctEventName, flags, allFlagHitsForRange, variants } =
    useLoaderData<LoaderData>();
  const [searchParams, setSearchParams] = useSearchParams();
  const actionData = useActionData<ActionData>();
  const allEvents = actionData?.allEvents || [];

  const flagId = searchParams.get("flagId");
  const variantId = searchParams.get("variantId");

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

  const setSearchFlagId = (nextFlagId: string) =>
    setSearchParams((prev) => {
      prev.set("flagId", nextFlagId);
      prev.delete("variantId");

      return prev;
    });

  const setSearchVariant = (variantId: string) =>
    setSearchParams((prev) => {
      prev.set("variantId", variantId);

      return prev;
    });

  const barChartData = [];

  if (flagId) {
    barChartData.push({
      eventName: "Flag evaluation",
      count: allFlagHitsForRange,
    });
  }

  const variantOptions = [{ label: "False", value: "false" }];

  if (variants.length > 0) {
    for (const variant of variants) {
      variantOptions.push({ label: variant.value, value: variant.value });
    }
  } else {
    variantOptions.push({ label: "True", value: "true" });
  }

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

          <BarChart data={barChartData} />

          <CardContent>
            <FormGroup>
              <SelectField
                name="flag-name"
                label="Feature flag"
                options={flagOptions}
                onValueChange={(e) => setSearchFlagId(e)}
                defaultValue={flagId || ""}
              />

              <SelectField
                name="variant"
                label="Feature flag variant"
                options={variantOptions}
                onValueChange={(e) => setSearchVariant(e)}
                defaultValue={variantId || ""}
              />

              <Form method="POST">
                {allEvents.map((ev) => (
                  <input type="hidden" value={ev} name="event" key={ev} />
                ))}
                <FormGroup>
                  <input type="hidden" name="_type" value="add-metric-name" />

                  <SelectField
                    name="event-name"
                    label="Event"
                    options={selectOptions}
                  />
                  <SubmitButton variant="secondary">Add metric</SubmitButton>
                </FormGroup>
              </Form>
            </FormGroup>
          </CardContent>
        </Card>
      </Section>
    </DashboardLayout>
  );
}
