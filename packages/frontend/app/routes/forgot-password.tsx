import { Stack, Box, HStack, Link as CLink } from "@chakra-ui/react";
import { MdChevronLeft, MdPassword } from "react-icons/md";
import {
  ActionFunction,
  Form,
  Link,
  MetaFunction,
  useActionData,
  useTransition,
} from "remix";
import { Button } from "~/components/Button";
import { ErrorBox } from "~/components/ErrorBox";
import { TextInput } from "~/components/Fields/TextInput";
import { Header } from "~/components/Header";
import { Main } from "~/components/Main";
import { SuccessBox } from "~/components/SuccessBox";
import { Typography } from "~/components/Typography";
import { NotAuthenticatedLayout } from "~/layouts/NotAuthenticatedLayout";
import { validateEmail } from "~/modules/forms/utils/validateEmail";
import { forgotPassword } from "~/modules/user/services/forgotPassword";

export const meta: MetaFunction = () => {
  return {
    title: "Progressively | Password forgotten",
  };
};

interface ActionData {
  success?: boolean;
  errors?: { email?: string; backendError?: string };
}

export const action: ActionFunction = async ({
  request,
}): Promise<ActionData> => {
  const formData = await request.formData();
  const email = formData.get("email")?.toString();

  const emailError = validateEmail(email);

  if (emailError) {
    return {
      errors: {
        email: emailError,
      },
    };
  }

  try {
    await forgotPassword(email!);

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

export default function ForgotPasswordPage() {
  const data = useActionData<ActionData>();
  const transition = useTransition();
  const success = data?.success;
  const errors = data?.errors;

  return (
    <NotAuthenticatedLayout>
      <Main>
        <HStack mb={4}>
          <MdChevronLeft aria-hidden />
          <CLink as={Link} to="/signin" fontSize="xl" textColor="textlight">
            Back to signin
          </CLink>
        </HStack>

        <Box pb={4}>
          <Header
            title="Password forgotten"
            description={
              <Typography color="textlight">
                Enter your email to get a recovery link and reset your password.
              </Typography>
            }
          />
        </Box>

        <Form method="post">
          <Stack spacing={4} mt={4}>
            {errors && Object.keys(errors).length > 0 && (
              <ErrorBox list={errors} />
            )}

            {success && (
              <SuccessBox id="password-reset">
                An email with a link to reset your password has been set. Make
                sure to follow the instructions.
              </SuccessBox>
            )}

            <TextInput
              isInvalid={Boolean(errors?.email)}
              label="Email"
              name="email"
              type="email"
              placeholder="e.g: james.bond@mi6.com"
            />

            <Box>
              <Button
                type="submit"
                colorScheme={"brand"}
                leftIcon={<MdPassword aria-hidden />}
                isLoading={transition.state === "submitting"}
                loadingText="Password resetting in progress, please wait..."
                disabled={false}
              >
                Reset password
              </Button>
            </Box>
          </Stack>
        </Form>
      </Main>
    </NotAuthenticatedLayout>
  );
}
