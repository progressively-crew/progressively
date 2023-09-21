import { Button } from "~/components/Buttons/Button";
import { Logo } from "~/components/Logo/Logo";
import { Progress } from "~/components/Progress";

export const UserDropdown = () => {
  return (
    <nav
      aria-label="User related"
      className="flex flex-row gap-2 items-center justify-between"
    >
      <div className="flex flex-row gap-2 items-center">
        <Button to="/dashboard" variant="tertiary-inverse">
          <Logo aria-label="Progressively project list" />
        </Button>
      </div>
    </nav>
  );
};
