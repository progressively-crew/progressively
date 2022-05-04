import { Box, FormControl, Input } from "@chakra-ui/react";
import { IoIosCreate } from "react-icons/io";
import {
  Form,
  useActionData,
  ActionFunction,
  LoaderFunction,
  redirect,
} from "remix";
import { Button } from "~/components/Button";
import { ErrorBox } from "~/components/ErrorBox";
import { FormLabel } from "~/components/FormLabel";
import { Header } from "~/components/Header";
import { Section } from "~/components/Section";
import { authGuard } from "~/modules/auth/services/auth-guard";
import { changeFullname } from "~/modules/user/services/changeFullname";
import { User } from "~/modules/user/types";
import { validateUserFullname } from "~/modules/user/validators/validate-user-fullname";
import { getSession } from "~/sessions";
import { DashboardLayout } from "../../layouts/DashboardLayout";

export const meta = () => {
  return {
    title: "Progressively | What's your name?",
  };
};

interface LoaderData {
  user: User;
}

export const loader: LoaderFunction = async ({
  request,
}): Promise<LoaderData> => {
  const user = await authGuard(request);

  return { user };
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
    >
      <Section>
        <Box p={[4, 0]}>
          {errors?.fullname && (
            <Box pb={4}>
              <ErrorBox list={errors} />
            </Box>
          )}

          <Form method="post">
            <FormControl isInvalid={Boolean(errors?.fullname)}>
              <FormLabel htmlFor="fullname">Fullname</FormLabel>
              <Input
                type="text"
                name="fullname"
                id="fullname"
                placeholder="e.g: John Doe"
                aria-describedby={
                  errors?.fullname ? `error-fullname` : undefined
                }
                maxW="34ch"
              />
            </FormControl>

            <Box mt={4}>
              <Button
                type="submit"
                leftIcon={<IoIosCreate aria-hidden />}
                colorScheme="brand"
              >
                Set my fullname
              </Button>
            </Box>
          </Form>
        </Box>
      </Section>
    </DashboardLayout>
  );
}
