import { Button } from "~/components/Button";
import { H1 } from "~/components/H1";
import { Typography } from "~/components/Typography";
import { ErrorLayout } from "~/layouts/ErrorLayout";

export default function UnauthorizedPage() {
  return (
    <ErrorLayout>
      <H1>{`Woops! You're not authorized to see this content`}</H1>

      <Typography>
        {`It looks you're trying to access this page while not being
          authenticated.`}
      </Typography>

      <Typography>
        To access this content, make sure to fill the authentication page form.
      </Typography>

      <Button to="/signin">Signin page</Button>
    </ErrorLayout>
  );
}
