import {
  Box,
  FormControl,
  Input,
  Stack,
  Text,
  Link as CLink,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import { AiOutlineLogin } from "react-icons/ai";
import {
  Form,
  useActionData,
  useTransition,
  ActionFunction,
  redirect,
  MetaFunction,
  Link,
  useSearchParams,
} from "remix";
import { Button } from "~/components/Button";
import { ErrorBox } from "~/components/ErrorBox";
import { FormLabel } from "~/components/FormLabel";
import { H1 } from "~/components/H1";
import { Main } from "~/components/Main";
import { Section } from "~/components/Section";
import { SuccessBox } from "~/components/SuccessBox";
import { NotAuthenticatedLayout } from "~/layouts/NotAuthenticatedLayout";
import { AuthCredentials } from "~/modules/auth/types";
import { commitSession, getSession } from "~/sessions";
import { authenticate } from "../modules/auth/services/authenticate";
import { validateSigninForm } from "../modules/auth/validators/validate-signin-form";

export const meta: MetaFunction = () => {
  return {
    title: "Progressively | Sign in",
  };
};

interface ActionData {
  errors?: Partial<AuthCredentials & { badUser: string }>;
}

export const action: ActionFunction = async ({
  request,
}): Promise<ActionData | Response> => {
  const session = await getSession(request.headers.get("Cookie"));
  const formData = await request.formData();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const errors = validateSigninForm({ email, password });

  if (errors?.email || errors?.password) {
    return { errors };
  }

  const res = await authenticate(email!, password!);

  const authenticationSucceed = await res.json();

  if (!authenticationSucceed.access_token || !res.headers.get("set-cookie")) {
    return {
      errors: {
        badUser: "Woops! Looks the credentials are not valid.",
      },
    };
  }

  session.set("auth-cookie", authenticationSucceed.access_token);
  session.set("refresh-token-cookie", res.headers.get("set-cookie"));

  return redirect("/dashboard", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};

export default function Signin() {
  const transition = useTransition();
  const [searchParams] = useSearchParams();
  const userActivated = searchParams.get("userActivated");
  const data = useActionData<ActionData>();
  const errors = data?.errors;

  return (
    <NotAuthenticatedLayout>
      <Main>
        <Section>
          <Box>
            <H1>Signin</H1>
            <Text>Welcome</Text>
          </Box>

          <Form method="post">
            <Stack spacing={4} mt={4}>
              {(errors?.password || errors?.email || errors?.badUser) && (
                <ErrorBox list={errors} />
              )}

              {Boolean(userActivated) && (
                <SuccessBox id="user-activated">
                  The account has been activated, you can now log in
                </SuccessBox>
              )}

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

              <Button
                type="submit"
                colorScheme={"brand"}
                leftIcon={<AiOutlineLogin aria-hidden />}
                isLoading={transition.state === "submitting"}
                loadingText="Signin in progress, please wait..."
                disabled={false}
              >
                Sign in
              </Button>
            </Stack>
          </Form>

          <Stack
            mt={6}
            spacing={2}
            as={UnorderedList}
            aria-label="Account related"
          >
            <ListItem>
              <CLink as={Link} to="/register" textDecoration={"underline"}>
                {`Create an account`}
              </CLink>
            </ListItem>

            <ListItem>
              <CLink
                as={Link}
                to="/forgot-password"
                textDecoration={"underline"}
              >
                {`I forgot my password`}
              </CLink>
            </ListItem>
          </Stack>
        </Section>
      </Main>
    </NotAuthenticatedLayout>
  );
}
