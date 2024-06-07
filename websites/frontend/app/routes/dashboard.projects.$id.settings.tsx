import { Progressively } from "@progressively/server-side";
import { Section, SectionHeader } from "~/components/Section";
import { DashboardLayout } from "~/layouts/DashboardLayout";
import { UserRoles } from "~/modules/projects/types";
import { UserTable } from "~/modules/user/components/UserTable";
import {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
  redirect,
} from "@remix-run/node";
import { Card, CardContent } from "~/components/Card";
import { CreateButton } from "~/components/Buttons/CreateButton";
import { useProject } from "~/modules/projects/contexts/useProject";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { PageTitle } from "~/components/PageTitle";
import { ProjectNavBar } from "~/modules/projects/components/ProjectNavBar";
import { Typography } from "~/components/Typography";
import {
  Form,
  Outlet,
  useActionData,
  useLoaderData,
  useNavigation,
  useSearchParams,
} from "@remix-run/react";
import { SuccessBox } from "~/components/Boxes/SuccessBox";
import { DeleteButton } from "~/components/Buttons/DeleteButton";
import { VisuallyHidden } from "~/components/VisuallyHidden";
import { getSession } from "~/sessions";
import { rotateSecretKey } from "~/modules/projects/services/rotateSecretKey";
import { ErrorBox } from "~/components/Boxes/ErrorBox";
import { ButtonCopy } from "~/components/ButtonCopy";
import { Dd, Dl, Dt } from "~/components/Dl";
import { Spacer } from "~/components/Spacer";
import { EditButton } from "~/components/Buttons/EditButton";
import { IconButton } from "~/components/Buttons/IconButton";
import { IoRefreshCircleOutline } from "react-icons/io5";
import { CheckoutForm } from "~/modules/payments/components/CheckoutForm";
import { createCheckoutSession } from "~/modules/payments/services/createCheckoutSession";
import { getEventUsage } from "~/modules/payments/services/getEventUsage";

export const meta: MetaFunction = ({ matches }) => {
  const projectName = getProjectMetaTitle(matches);

  return [
    {
      title: `Progressively | ${projectName} | Settings`,
    },
  ];
};

interface ActionDataType {
  success?: boolean;
}

export const action: ActionFunction = async ({
  request,
  params,
}): Promise<ActionDataType> => {
  const session = await getSession(request.headers.get("Cookie"));
  const authCookie = session.get("auth-cookie");
  const formData = await request.formData();
  const type = formData.get("_type")?.toString();

  if (type === "start-payment") {
    const countStr = formData.get("count")?.toString();
    const count = countStr ? Number(countStr) : 1;

    const session = await createCheckoutSession(params.id!, count, authCookie);

    throw redirect(session.sessionUrl);
  }

  try {
    await rotateSecretKey(params.id!, authCookie);
    return { success: true };
  } catch {
    return { success: false };
  }
};

export const loader: LoaderFunction = async ({ params, request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const authCookie = session.get("auth-cookie");
  const usage = await getEventUsage(params.id!, authCookie);

  try {
    const sdk = Progressively.init({
      secretKey: process.env.PROGRESSIVELY_SECRET_KEY!,
      websocketUrl: "wss://api.progressively.app",
      apiUrl: "https://api.progressively.app",
      fields: {
        environment: process.env.NODE_ENV!,
      },
    });

    const { data } = await sdk.loadFlags();

    return { isPricingEnabled: data?.flags?.pricingEnabled ?? false, ...usage };
  } catch {
    return { isPricingEnabled: false, ...usage };
  }
};

export default function SettingsPage() {
  const { project, userRole } = useProject();
  const { eventsCount, eventsPerCredits, isPricingEnabled } =
    useLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();
  const actionData = useActionData<ActionDataType>();
  const navigation = useNavigation();
  const isMemberRemoved = searchParams.get("memberRemoved") || undefined;

  const checkoutSuccess = searchParams.get("checkoutSuccess") === "true";

  const actionResult =
    actionData?.success === true ? (
      <SuccessBox id="secret-key-rotated">
        The secret key has been rotated.
      </SuccessBox>
    ) : actionData?.success === false ? (
      <ErrorBox
        list={{
          error: "A problem occured when trying to rotate the secret key.",
        }}
      ></ErrorBox>
    ) : null;

  return (
    <>
      <DashboardLayout
        subNav={<ProjectNavBar project={project} />}
        status={
          checkoutSuccess ? (
            <SuccessBox id="checkout-succeed">
              Checkout sent! It may take a few minutes before seeing your
              credits appearing.
            </SuccessBox>
          ) : (
            actionResult ??
            (isMemberRemoved ? (
              <SuccessBox id={"plan-add-success"}>
                The member has been successfully removed.
              </SuccessBox>
            ) : null)
          )
        }
      >
        <PageTitle
          value="Settings"
          description={
            <Typography as="span">
              Settings available for{" "}
              <strong className="font-bold">{project.name}</strong>.
            </Typography>
          }
        />

        <Card>
          <CardContent>
            <Section id="general">
              <SectionHeader
                title="General"
                action={
                  userRole === UserRoles.Admin && (
                    <EditButton
                      variant="secondary"
                      to={`/dashboard/projects/${project.uuid}/settings/edit`}
                    >
                      Edit
                    </EditButton>
                  )
                }
                description={
                  "The following is the project keys to use inside your application to get the flag variation"
                }
              />

              <Spacer size={4} />
              <Dl>
                <Dt>Client key</Dt>
                <Dd>
                  <ButtonCopy toCopy={project.clientKey} size="S">
                    {project.clientKey}
                  </ButtonCopy>
                </Dd>

                <Dt>Secret key</Dt>
                <Dd>
                  <div className="flex flex-row gap-2 items-center">
                    <ButtonCopy
                      size="S"
                      toCopy={project.secretKey}
                      toCopyAlternative="**********"
                    >
                      **********
                    </ButtonCopy>
                    <Form method="post">
                      <IconButton
                        icon={<IoRefreshCircleOutline />}
                        tooltip={"Rotate secret key"}
                        isLoading={
                          navigation.state === "submitting" &&
                          !navigation.formData?.get("_type")
                        }
                      />
                    </Form>
                  </div>
                </Dd>
              </Dl>
            </Section>
          </CardContent>
        </Card>

        {userRole === UserRoles.Admin && isPricingEnabled && (
          <Card>
            <CardContent>
              <Section id="payment">
                <SectionHeader
                  title="Payment"
                  titleAs="h3"
                  description={
                    <>
                      <strong className="font-bold">1 credit</strong>{" "}
                      corresponds to{" "}
                      <strong className="font-bold">
                        {eventsPerCredits} events in total
                      </strong>
                      . It includes feature flags evaluations, page views, and
                      custom events.
                    </>
                  }
                />

                <div className="rounded-xl bg-gray-100 p-6 inline-block mt-4">
                  <div className="pb-4">
                    <strong className="text-gray-950 text-3xl">
                      {(eventsCount / eventsPerCredits).toFixed(3)} credits
                      available
                    </strong>
                    <span className="pl-2 text-sm">({eventsCount} events)</span>
                  </div>

                  <CheckoutForm />
                </div>
              </Section>
            </CardContent>
          </Card>
        )}

        <Card>
          <Section id="members">
            <CardContent>
              <SectionHeader
                title="Project members"
                action={
                  userRole === UserRoles.Admin && (
                    <CreateButton
                      variant="secondary"
                      to={`/dashboard/projects/${project.uuid}/settings/add-member`}
                    >
                      Add member
                    </CreateButton>
                  )
                }
              />
            </CardContent>

            <UserTable userProjects={project.userProject || []} />
          </Section>
        </Card>

        {userRole === UserRoles.Admin && (
          <Card
            footer={
              <DeleteButton
                to={`/dashboard/projects/${project.uuid}/settings/delete`}
              >
                <span aria-hidden>
                  Delete{" "}
                  <span className="hidden md:inline">
                    {`"${project.name}"`} forever
                  </span>
                </span>

                <VisuallyHidden>
                  Delete {`"${project.name}"`} forever
                </VisuallyHidden>
              </DeleteButton>
            }
          >
            <CardContent>
              <Section id="danger">
                <SectionHeader
                  title="Danger zone"
                  description={
                    "You can delete a project at any time. Its related flags will be removed and be falsy in your applications. Be sure to know what you're doing before removing a project."
                  }
                />
              </Section>
            </CardContent>
          </Card>
        )}
      </DashboardLayout>
      <Outlet />
    </>
  );
}
