import { AiOutlineLogin } from "react-icons/ai/index.js";
import { Button } from "~/components/Buttons/Button";
import { Spacer } from "~/components/Spacer";
import { Typography } from "~/components/Typography";

export default function NotFoundPage() {
  return (
    <main className="p-8">
      <Typography as="h1" className="font-bold text-lg">
        {`Woops! This page does not exist.`}
      </Typography>
      <Typography>
        {`It looks you're trying to access a content that does not exist.`}
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
