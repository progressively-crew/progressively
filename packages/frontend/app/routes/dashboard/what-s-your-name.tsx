import { ActionFunction, redirect } from "@remix-run/node";
import { useActionData, Form } from "@remix-run/react";
import { SubmitButton } from "~/components/Buttons/SubmitButton";
import { ErrorBox } from "~/components/Boxes/ErrorBox";
import { FormGroup } from "~/components/Fields/FormGroup";
import { TextInput } from "~/components/Fields/TextInput";
import { Header } from "~/components/Header";
import { Section } from "~/components/Section";
import { changeFullname } from "~/modules/user/services/changeFullname";
import { validateUserFullname } from "~/modules/user/validators/validate-user-fullname";
import { getSession } from "~/sessions";
import { DashboardLayout } from "../../layouts/DashboardLayout";

export const meta = () => {
  return {
    title: "Progressively | What's your name?",
  };
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
    <DashboardLayout
      header={<Header title="Hey, welcome around! What's your name?" />}
      status={errors?.fullname && <ErrorBox list={errors} />}
    >
      <Section>
        <Form method="post">
          <FormGroup>
            <TextInput
              isInvalid={Boolean(errors?.fullname)}
              label="Fullname"
              name="fullname"
              placeholder="e.g: John Doe"
            />

            <div>
              <SubmitButton type="submit">Set my fullname</SubmitButton>
            </div>
          </FormGroup>
        </Form>
      </Section>
    </DashboardLayout>
  );
}
