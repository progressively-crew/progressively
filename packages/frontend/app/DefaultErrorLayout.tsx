import { Typography } from "./components/Typography";
import { Spacer } from "./components/Spacer";
import { AiOutlineLogin } from "react-icons/ai";
import { Button } from "./components/Buttons/Button";
import { Document } from "./Document";

export function DefaultErrorLayout({ errorMessage }: { errorMessage: string }) {
  return (
    <Document title="Error!">
      <main className="p-8">
        <Typography as="h1" className="font-bold text-lg">
          Outch, a wild error appeared!
        </Typography>

        <Typography>{errorMessage}</Typography>

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
    </Document>
  );
}
