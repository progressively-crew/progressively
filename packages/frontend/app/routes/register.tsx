import { ActionFunction, MetaFunction, LoaderFunction, redirect } from "remix";
import { Main } from "~/components/Main";
import { HStack, Box } from "@chakra-ui/react";
import { MdChevronLeft } from "react-icons/md";
import { NotAuthenticatedLayout } from "~/layouts/NotAuthenticatedLayout";
import {
  RegisterForm,
  registerAction,
  RegisterActionData,
} from "~/modules/user/components/RegisterForm";
import { Header } from "~/components/Header";
import { Link } from "~/components/Link";

export const meta: MetaFunction = () => {
  return {
    title: "Progressively| Create an account",
  };
};

export const action: ActionFunction = ({
  request,
}): Promise<RegisterActionData> => {
  return registerAction({ request });
};

export const loader: LoaderFunction = () => {
  if (process.env.ALLOW_REGISTRATION === "true") {
    return null;
  }

  return redirect("/signin");
};

export default function CreateAccountPage() {
  return (
    <NotAuthenticatedLayout>
      <Main>
        <HStack mb={4}>
          <MdChevronLeft aria-hidden />
          <Link to="/signin">Back to signin</Link>
        </HStack>

        <Box pb={4}>
          <Header title="Create an account" />
        </Box>

        <RegisterForm />
      </Main>
    </NotAuthenticatedLayout>
  );
}
