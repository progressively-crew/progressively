import { ActionFunction, V2_MetaFunction, redirect } from "@remix-run/node";
import { useActionData, Form } from "@remix-run/react";
import { SubmitButton } from "~/components/Buttons/SubmitButton";
import { ErrorBox } from "~/components/Boxes/ErrorBox";
import { TextInput } from "~/components/Fields/TextInput";
import { changeFullname } from "~/modules/user/services/changeFullname";
import { validateUserFullname } from "~/modules/user/validators/validate-user-fullname";
import { getSession } from "~/sessions";
import { NotAuthenticatedLayout } from "~/layouts/NotAuthenticatedLayout";
import { Typography } from "~/components/Typography";

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
      aside={<div />}
    >
      <Typography
        as="h1"
        className="text-center text-3xl font-extrabold pt-4 !leading-tight motion-safe:animate-fade-enter-top pb-4"
      >
        What's your name?
      </Typography>

      <div className="w-full">
        <Form method="post">
          <div className="flex flex-col gap-4">
            <div
              className="motion-safe:animate-fade-enter-bottom motion-safe:opacity-0"
              style={{ animationDelay: "300ms" }}
            >
              <TextInput
                isInvalid={Boolean(errors?.fullname)}
                label="Fullname"
                name="fullname"
                placeholder="e.g: John Doe"
                hiddenLabel
              />
            </div>

            <div
              className="motion-safe:animate-fade-enter-bottom motion-safe:opacity-0"
              style={{ animationDelay: "500ms" }}
            >
              <SubmitButton type="submit">Set my fullname</SubmitButton>
            </div>
          </div>
        </Form>
      </div>
    </NotAuthenticatedLayout>
  );
}
