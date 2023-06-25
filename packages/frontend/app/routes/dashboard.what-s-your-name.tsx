import { ActionFunction, V2_MetaFunction, redirect } from "@remix-run/node";
import { useActionData, Form } from "@remix-run/react";
import { SubmitButton } from "~/components/Buttons/SubmitButton";
import { ErrorBox } from "~/components/Boxes/ErrorBox";
import { TextInput } from "~/components/Fields/TextInput";
import { changeFullname } from "~/modules/user/services/changeFullname";
import { validateUserFullname } from "~/modules/user/validators/validate-user-fullname";
import { getSession } from "~/sessions";
import { NotAuthenticatedLayout } from "~/layouts/NotAuthenticatedLayout";
import { Stack } from "~/components/Stack";
import { H1Logo } from "~/components/H1Logo";

export const meta: V2_MetaFunction = () => {
  return [
    {
      title: "Progressively | What's your name?",
    },
  ];
};

interface ActionData {
  errors?: {
    fullname?: string;
  };
}

export const action: ActionFunction = async ({
  request,
}): Promise<ActionData | Response> => {
  const formData = await request.formData();
  const fullname = formData.get("fullname")?.toString() || "";
  const session = await getSession(request.headers.get("Cookie"));
  const errors = validateUserFullname(fullname);

  if (errors?.fullname) {
    return { errors };
  }

  await changeFullname(fullname!, session.get("auth-cookie"));

  return redirect("/dashboard");
};

export default function WhatsYourNamePage() {
  const data = useActionData<ActionData>();

  const errors = data?.errors;

  return (
    <NotAuthenticatedLayout
      status={errors?.fullname && <ErrorBox list={errors} />}
    >
      <Stack spacing={4}>
        <div className="text-center motion-safe:animate-fade-enter-top">
          <H1Logo> What's your name?</H1Logo>
        </div>

        <div
          className="motion-safe:animate-fade-enter-bottom motion-safe:opacity-0 pt-4"
          style={{
            animationDelay: "500ms",
          }}
        >
          <Form method="post">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex-1">
                <TextInput
                  isInvalid={Boolean(errors?.fullname)}
                  label="Fullname"
                  name="fullname"
                  placeholder="e.g: John Doe"
                  hiddenLabel
                />
              </div>

              <SubmitButton type="submit">Set my fullname</SubmitButton>
            </div>
          </Form>
        </div>
      </Stack>
    </NotAuthenticatedLayout>
  );
}
