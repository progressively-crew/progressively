import { Button } from "~/components/Buttons/Button";
import { H1 } from "~/components/H1";
import { Spacer } from "~/components/Spacer";
import { Typography } from "~/components/Typography";
import { ErrorLayout } from "~/layouts/ErrorLayout";

export default function NotFoundPage() {
  return (
    <ErrorLayout>
      <H1>{`Woops! This page does not exist.`}</H1>

      <Typography>{`It looks you're trying to access a content that does not exist.`}</Typography>

      <Spacer size={4} />

      <Button to="/signin">Signin page</Button>
    </ErrorLayout>
  );
}
