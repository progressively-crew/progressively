import { Button } from "~/components/Button";
import { H1 } from "~/components/H1";
import { Typography } from "~/components/Typography";
import { ErrorLayout } from "~/layouts/ErrorLayout";

export default function NotFoundPage() {
  return (
    <ErrorLayout>
      <H1>{`Woops! This page does not exist.`}</H1>

      <Typography>{`It looks you're trying to access a content that does not exist.`}</Typography>

      <Button to="/signin">Signin page</Button>
    </ErrorLayout>
  );
}
