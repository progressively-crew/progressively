import { HStack, Stack } from "@chakra-ui/react";
import { MdChevronLeft, MdPassword } from "react-icons/md";
import {
  ActionFunction,
  Form,
  LoaderFunction,
  MetaFunction,
  useActionData,
  useLoaderData,
  useTransition,
} from "remix";
import { Button } from "~/components/Button";
import { ErrorBox } from "~/components/ErrorBox";
import { TextInput } from "~/components/Fields/TextInput";
import { Header } from "~/components/Header";
import { Link } from "~/components/Link";
import { Section, SectionHeader } from "~/components/Section";
import { SuccessBox } from "~/components/SuccessBox";
import { DashboardLayout } from "~/layouts/DashboardLayout";
import { authGuard } from "~/modules/auth/services/auth-guard";
import {
  validatePassword,
  validateConfirmationPassword,
} from "~/modules/forms/utils/validatePassword";
import { changePassword } from "~/modules/user/services/changePassword";
import { User } from "~/modules/user/types";
import { getSession } from "~/sessions";

export const meta: MetaFunction = () => {
  return {
    title: "Progressively | Profile",
  };
};

interface ActionData {
  passwordUpdated?: boolean;
  errors?: {
    password?: string;
    confirmationPassword?: string;
    backendError?: string;
  };
}

export const action: ActionFunction = async ({
  request,
}): Promise<ActionData> => {
  const formData = await request.formData();

  const password = formData.get("password")?.toString();
  const confirmationPassword = formData.get("confirmationPassword")?.toString();

  const passwordError = validatePassword(password);
  const confirmationPasswordError =
    validateConfirmationPassword(confirmationPassword);

  if (passwordError || confirmationPasswordError) {
    return {
      errors: {
        password: passwordError,
        confirmationPassword: confirmationPasswordError,
      },
    };
  }

  if (password !== confirmationPassword) {
    return {
      errors: {
        password: "The two passwords are not the same.",
      },
    };
  }

  const session = await getSession(request.headers.get("Cookie"));
  const authCookie = session.get("auth-cookie");
  await changePassword(password!, confirmationPassword!, authCookie);

  return { passwordUpdated: true };
};

interface LoaderData {
  user: User;
}

export const loader: LoaderFunction = async ({
  request,
}): Promise<LoaderData | Response> => {
  const user = await authGuard(request);

  return { user };
};

export default function ProfilePage() {
  const transition = useTransition();
  const data = useActionData<ActionData>();
  const { user } = useLoaderData<LoaderData>();
  const passwordUpdated = data?.passwordUpdated;
  const errors = data?.errors;

  return (
    <DashboardLayout
      user={user}
      header={<Header title="My profile" />}
      breadcrumb={
        <nav>
          <Link to="/dashboard">
            <HStack alignItems={"center"} height={"44px"} fontSize="xl">
              <MdChevronLeft aria-hidden />
              <span>Back to dashboard</span>
            </HStack>
          </Link>
        </nav>
      }
    >
      <Section>
        <SectionHeader title="Change password" />

        <Form method="post">
          <Stack spacing={4} mt={4}>
            {errors && Object.keys(errors).length > 0 && (
              <ErrorBox list={errors} />
            )}

            {passwordUpdated && (
              <SuccessBox id="password-changed">
                The password has been successfully changed.
              </SuccessBox>
            )}

            <TextInput
              label="New password"
              name="password"
              isInvalid={Boolean(errors?.password)}
              placeholder="**********"
              type="password"
            />

            <TextInput
              label="Confirmation password"
              name="confirmationPassword"
              isInvalid={Boolean(errors?.confirmationPassword)}
              placeholder="**********"
              type="password"
            />

            <Button
              type="submit"
              colorScheme={"brand"}
              leftIcon={<MdPassword aria-hidden />}
              isLoading={transition.state === "submitting"}
              loadingText="Password changing in progress, please wait..."
              disabled={false}
            >
              Change password
            </Button>
          </Stack>
        </Form>
      </Section>
    </DashboardLayout>
  );
}
