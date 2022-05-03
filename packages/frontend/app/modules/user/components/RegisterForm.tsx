import { Stack, FormControl, FormLabel, Input, Box } from "@chakra-ui/react";
import { MdAccountCircle } from "react-icons/md";
import { ActionFunction, Form, useActionData, useTransition } from "remix";
import { Button } from "~/components/Button";
import { ErrorBox } from "~/components/ErrorBox";
import { SuccessBox } from "~/components/SuccessBox";
import { createUser } from "../services/createUser";
import { RegisterCredentials, User } from "../types";
import { validateRegistrationForm } from "../validators/validate-registration-form";

export interface RegisterActionData {
  newUser?: User;
  errors?: Partial<RegisterCredentials & { backend?: string }>;
}

export const registerAction: ActionFunction = async ({
  request,
}): Promise<RegisterActionData> => {
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

export const RegisterForm = () => {
  const transition = useTransition();
  const data = useActionData<RegisterActionData>();
  const newUser = data?.newUser;
  const errors = data?.errors;

  return (
    <Form method="post">
      <Stack spacing={4} mt={4}>
        {errors && Object.keys(errors).length > 0 && <ErrorBox list={errors} />}

        {newUser?.uuid && (
          <SuccessBox id="user-created">
            The user has been created! Take a look at your inbox, there should
            be a link to activate it :).
          </SuccessBox>
        )}

        <FormControl isInvalid={Boolean(errors?.fullname)}>
          <FormLabel htmlFor="fullname">Fullname</FormLabel>
          <Input
            id="fullname"
            name="fullname"
            type="text"
            placeholder="e.g: James Bond"
            aria-describedby={errors?.fullname ? "error-fullname" : undefined}
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
            aria-describedby={errors?.password ? "error-password" : undefined}
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
              errors?.confirmPassword ? "error-confirm-password" : undefined
            }
          />
        </FormControl>

        <Box>
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
        </Box>
      </Stack>
    </Form>
  );
};
