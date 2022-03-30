import {
  Stack,
  FormControl,
  Input,
  Box,
  Text,
  HStack,
  Link as CLink,
} from "@chakra-ui/react";
import { MdChevronLeft, MdPassword } from "react-icons/md";
import {
  ActionFunction,
  Form,
  Link,
  MetaFunction,
  useActionData,
  useSearchParams,
  useTransition,
} from "remix";
import { Button } from "~/components/Button";
import { ErrorBox } from "~/components/ErrorBox";
import { FormLabel } from "~/components/FormLabel";
import { H1 } from "~/components/H1";
import { Main } from "~/components/Main";
import { Section } from "~/components/Section";
import { SuccessBox } from "~/components/SuccessBox";
import { NotAuthenticatedLayout } from "~/layouts/NotAuthenticatedLayout";
import {
  validateConfirmationPassword,
  validatePassword,
} from "~/modules/forms/PasswordField/validatePassword";
import { resetPassword } from "~/modules/user/resetPassword";

export const meta: MetaFunction = () => {
  return {
    title: "Rollout | Reset password",
  };
};

interface ActionData {
  success?: boolean;
  errors?: {
    password?: string;
    confirmationPassword?: string;
    token?: string;
    backendError?: string;
  };
}

export const action: ActionFunction = async ({
  request,
}): Promise<ActionData> => {
  const formData = await request.formData();
  const token = formData.get("token")?.toString();
  const password = formData.get("password")?.toString();
  const confirmationPassword = formData.get("confirmationPassword")?.toString();

  const passwordError = validatePassword(password);
  const confirmationPasswordError =
    validateConfirmationPassword(confirmationPassword);

  if (!token) {
    return {
      errors: {
        token: "The token is missing",
      },
    };
  }

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

  try {
    await resetPassword(password!, token);

    return { success: true };
  } catch (err) {
    if (err instanceof Error) {
      return {
        errors: {
          backendError: err.message,
        },
      };
    }

    return { errors: { backendError: "An error ocurred" } };
  }
};

export default function ResetPasswordPage() {
  const data = useActionData<ActionData>();
  const [searchParams] = useSearchParams();
  const transition = useTransition();
  const urlToken = searchParams.get("token");
  const success = data?.success;
  const errors = data?.errors;

  return (
    <NotAuthenticatedLayout>
      <Main>
        <HStack mb={4}>
          <MdChevronLeft aria-hidden />
          <CLink as={Link} to="/signin">
            Back to signin
          </CLink>
        </HStack>
        <Section>
          <Box>
            <H1>Reset password</H1>
            <Text>Set your new password.</Text>
          </Box>

          <Form method="post">
            <Stack spacing={4} mt={4}>
              {errors && Object.keys(errors).length > 0 && (
                <ErrorBox list={errors} />
              )}

              {success && (
                <SuccessBox id="password-reset">
                  The password has been successfully reset. You can now connect.
                </SuccessBox>
              )}

              <input
                type="hidden"
                name="token"
                id="token"
                value={urlToken || ""}
              />

              <FormControl isInvalid={Boolean(errors?.password)}>
                <FormLabel htmlFor="password">New password</FormLabel>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="**********"
                  aria-describedby={
                    errors?.password ? "error-password" : undefined
                  }
                />
              </FormControl>

              <FormControl isInvalid={Boolean(errors?.confirmationPassword)}>
                <FormLabel htmlFor="confirmationPassword">
                  Confirmation password
                </FormLabel>
                <Input
                  id="confirmationPassword"
                  name="confirmationPassword"
                  type="password"
                  placeholder="**********"
                  aria-describedby={
                    errors?.confirmationPassword
                      ? "error-confirmationPassword"
                      : undefined
                  }
                />
              </FormControl>

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
      </Main>
    </NotAuthenticatedLayout>
  );
}
