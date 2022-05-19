import { Box } from "@chakra-ui/react";
import { AiOutlineLogin } from "react-icons/ai";
import { Link } from "remix";
import { Button } from "~/components/Button";
import { H1 } from "~/components/H1";
import { ErrorLayout } from "~/layouts/ErrorLayout";

export default function UnauthorizedPage() {
  return (
    <ErrorLayout>
      <H1>{`Woops! You're not authorized to see this content`}</H1>

      <Box my={6}>
        <p>
          {`It looks you're trying to access this page while not being
          authenticated.`}
        </p>
      </Box>

      <Box my={6}>
        <p>
          To access this content, make sure to fill the authentication page
          form.
        </p>
      </Box>

      <Button
        as={Link}
        to="/signin"
        colorScheme={"brand"}
        leftIcon={<AiOutlineLogin aria-hidden />}
      >
        Signin page
      </Button>
    </ErrorLayout>
  );
}
