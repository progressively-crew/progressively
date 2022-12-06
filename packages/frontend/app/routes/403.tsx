import { AiOutlineLogin } from "react-icons/ai";
import { Button } from "~/components/Buttons/Button";
import { Spacer } from "~/components/Spacer";
import { Typography } from "~/components/Typography";

export default function ForbiddenPage() {
  return (
    <main className="p-8">
      <Typography as="h1" className="font-bold text-lg">
        {`Woops! You're not authorized to see this content`}
      </Typography>

      <Typography>
        {`It looks you're trying to access this page while not being
            authenticated.`}
      </Typography>

      <Typography>
        To access this content, make sure to fill the authentication page form.
      </Typography>

      <Spacer size={2} />

      <div className="inline-block">
        <Button
          to="/signin"
          variant="secondary"
          icon={<AiOutlineLogin aria-hidden />}
        >
          Signin page
        </Button>
      </div>
    </main>
  );
}
