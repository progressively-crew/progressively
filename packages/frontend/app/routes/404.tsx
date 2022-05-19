import { Box } from "@chakra-ui/react";
import { AiOutlineLogin } from "react-icons/ai";
import { Link } from "remix";
import { Button } from "~/components/Button";
import { H1 } from "~/components/H1";
import { ErrorLayout } from "~/layouts/ErrorLayout";

export default function NotFoundPage() {
  return (
    <ErrorLayout>
      <H1>{`Woops! This page does not exist.`}</H1>

      <Box my={6}>
        <p>
          {`It looks you're trying to access a content that does not exist.`}
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
