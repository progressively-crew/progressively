import { ActionFunction, MetaFunction, Link } from "remix";
import { Main } from "~/components/Main";
import { Link as CLink, HStack, Box } from "@chakra-ui/react";
import { MdChevronLeft } from "react-icons/md";
import { NotAuthenticatedLayout } from "~/layouts/NotAuthenticatedLayout";
import {
  RegisterForm,
  registerAction,
  RegisterActionData,
} from "~/modules/user/components/RegisterForm";
import { Header } from "~/components/Header";

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

export default function CreateAccountPage() {
  return (
    <NotAuthenticatedLayout>
      <Main>
        <HStack mb={4}>
          <MdChevronLeft aria-hidden />
          <CLink as={Link} to="/signin">
            Back to signin
          </CLink>
        </HStack>

        <Box pb={4}>
          <Header title="Create an account" />
        </Box>

        <RegisterForm />
      </Main>
    </NotAuthenticatedLayout>
  );
}
