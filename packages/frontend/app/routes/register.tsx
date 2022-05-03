import {
  Form,
  useActionData,
  useTransition,
  ActionFunction,
  MetaFunction,
  Link,
} from "remix";
import { ErrorBox } from "~/components/ErrorBox";
import { Main } from "~/components/Main";
import { createUser } from "~/modules/user/services/createUser";
import { RegisterCredentials } from "~/modules/user/types";
import { validateRegistrationForm } from "~/modules/user/validators/validate-registration-form";
import { User } from "~/modules/user/types";
import { SuccessBox } from "~/components/SuccessBox";
import {
  Box,
  FormControl,
  Input,
  Stack,
  Link as CLink,
  HStack,
} from "@chakra-ui/react";
import { MdAccountCircle, MdChevronLeft } from "react-icons/md";
import { H1 } from "~/components/H1";
import { Section } from "~/components/Section";
import { NotAuthenticatedLayout } from "~/layouts/NotAuthenticatedLayout";
import { Button } from "~/components/Button";
import { FormLabel } from "~/components/FormLabel";

export const meta: MetaFunction = () => {
  return {
    title: "Progressively| Create an account",
  };
};

interface ActionData {
  newUser?: User;
  errors?: Partial<RegisterCredentials & { backend?: string }>;
}

export const action: ActionFunction = async ({
  request,
}): Promise<ActionData> => {
  const formData = await request.formData();
  const fullname = formData.get("fullname")?.toString();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const confirmPassword = formData.get("confirm-password")?.toString();

  const errors = validateRegistrationForm({
    email,
    password,
    fullname,
    confirmPassword,
  });

  if (
    errors?.fullname ||
    errors?.email ||
    errors?.password ||
    errors?.confirmPassword
  ) {
    return { errors };
  }

  try {
    const newUser: User = await createUser(fullname!, email!, password!);

    return { newUser };
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        errors: {
          backend: err.message,
        },
      };
    }

    return { errors: { backend: "An error ocurred" } };
  }
};

export default function CreateAccountPage() {
  const transition = useTransition();
  const data = useActionData<ActionData>();
  const newUser = data?.newUser;
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
            <H1>Create an account</H1>
          </Box>

          <Form method="post">
            <Stack spacing={4} mt={4}>
              {errors && Object.keys(errors).length > 0 && (
                <ErrorBox list={errors} />
              )}

              {newUser?.uuid && (
                <SuccessBox id="user-created">
                  The user has been created! Take a look at your inbox, there
                  should be a link to activate it :).
                </SuccessBox>
              )}

              <FormControl isInvalid={Boolean(errors?.fullname)}>
                <FormLabel htmlFor="fullname">Fullname</FormLabel>
                <Input
                  id="fullname"
                  name="fullname"
                  type="text"
                  placeholder="e.g: James Bond"
                  aria-describedby={
                    errors?.fullname ? "error-fullname" : undefined
                  }
                />
              </FormControl>

              <FormControl isInvalid={Boolean(errors?.email)}>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="e.g: james.bond@mi6.com"
                  aria-describedby={errors?.email ? "error-email" : undefined}
                />
              </FormControl>

              <FormControl isInvalid={Boolean(errors?.password)}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="************"
                  aria-describedby={
                    errors?.password ? "error-password" : undefined
                  }
                />
              </FormControl>

              <FormControl isInvalid={Boolean(errors?.confirmPassword)}>
                <FormLabel htmlFor="confirm-password">
                  Confirm your password
                </FormLabel>
                <Input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  placeholder="************"
                  aria-describedby={
                    errors?.confirmPassword
                      ? "error-confirm-password"
                      : undefined
                  }
                />
              </FormControl>

              <Button
                type="submit"
                colorScheme={"brand"}
                leftIcon={<MdAccountCircle aria-hidden />}
                isLoading={transition.state === "submitting"}
                loadingText="Creation in progress, please wait..."
                disabled={false}
              >
                Create an account
              </Button>
            </Stack>
          </Form>
        </Section>
      </Main>
    </NotAuthenticatedLayout>
  );
}
