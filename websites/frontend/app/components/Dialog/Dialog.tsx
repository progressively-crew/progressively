import { Link } from "@remix-run/react";
import { MdClose } from "react-icons/md";
import { useSetInert } from "../Inert/hooks/useSetInert";
import { Tooltip } from "../Tooltip/Tooltip";
import { FocusTrap } from "../FocusTrap";
import { useRef } from "react";
import { KeyboardKeys } from "~/modules/a11y/utils/keyboardKeys";

export interface DialogProps {
  children: React.ReactNode;
  title: React.ReactNode;
  closeBtn: React.ReactNode;
  action?: React.ReactNode;
  scheme?: "ERROR" | "DEFAULT";
}

const schemeClasses = {
  ERROR: "bg-red-50",
  DEFAULT: "bg-slate-100",
};

export const Dialog = ({
  children,
  action,
  closeBtn,
  title,
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

  const schemeClass = schemeClasses[scheme];

  return (
    <FocusTrap isActive={true}>
      <div
        className="fixed h-full w-full inset-0 backdrop-blur-md bg-slate-700/30 z-20"
        onKeyUp={handleKeyDown}
      >
        <div className="mx-auto max-w-2xl w-full lg:pt-20 px-4 md:px-12">
          <div
            ref={wrapperRef}
            className="motion-safe:animate-fade-enter-bottom motion-safe:opacity-0 bg-white rounded-xl shadow-xl"
            style={{
              animationDelay: "300ms",
            }}
          >
            <div className="">
              <div className="flex justify-between gap-4 border-b border-slate-200 items-center px-12 py-6">
                {title}
                {closeBtn}
              </div>

              <div className="px-12 py-6">{children}</div>

              <div className={`${schemeClass} rounded-b-xl py-6 px-12`}>
                {action}
              </div>
            </div>
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
