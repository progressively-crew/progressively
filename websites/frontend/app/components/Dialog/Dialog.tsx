import { Link } from "@remix-run/react";
import { MdClose } from "react-icons/md";
import { Card, CardContent, CardProps } from "../Card";
import { useSetInert } from "../Inert/hooks/useSetInert";
import { Tooltip } from "../Tooltip/Tooltip";
import { FocusTrap } from "../FocusTrap";
import { useRef } from "react";
import { KeyboardKeys } from "~/modules/a11y/utils/keyboardKeys";

export interface DialogProps {
  children: React.ReactNode;
  action: React.ReactNode;
  scheme?: CardProps["scheme"];
}

export const Dialog = ({
  children,
  action,
  scheme = "DEFAULT",
}: DialogProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  useSetInert();

  const clickClose = () => {
    const el = wrapperRef?.current?.querySelector(".custom-dialog-close") as
      | HTMLAnchorElement
      | undefined;

    if (el) {
      el.click();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === KeyboardKeys.ESCAPE) {
      clickClose();
    }
  };

  return (
    <FocusTrap isActive={true}>
      <div
        className="fixed h-full w-full inset-0 backdrop-blur-md bg-slate-300/30"
        onKeyUp={handleKeyDown}
      >
        <div className="mx-auto max-w-2xl w-full lg:pt-20 px-4 md:px-12">
          <div
            ref={wrapperRef}
            className="motion-safe:animate-fade-enter-bottom motion-safe:opacity-0"
            style={{
              animationDelay: "300ms",
            }}
          >
            <Card footer={action} scheme={scheme}>
              <CardContent>{children}</CardContent>
            </Card>
          </div>
        </div>
      </div>
    </FocusTrap>
  );
};

export interface DialogCloseBtnProps {
  to: string;
  label: string;
}

export const DialogCloseBtn = ({ to, label }: DialogCloseBtnProps) => {
  return (
    <Tooltip tooltip={label}>
      <Link
        to={to}
        className="text-xl rounded bg-transparent hover:bg-slate-200 active:bg-slate-300 flex items-center justify-center w-6 h-6 custom-dialog-close"
      >
        <MdClose aria-label={label} />
      </Link>
    </Tooltip>
  );
};
