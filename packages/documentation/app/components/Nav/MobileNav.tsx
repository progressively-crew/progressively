import { useNavToggle } from "./hooks/useNavToggle";
import { IoCloseOutline } from "react-icons/io5";
import { Spacer } from "../Spacer";
import { FocusTrap } from "../FocusTrap";
import { DocMenu } from "./DocMenu";
import { VisuallyHidden } from "../VisuallyHidden";

export const MobileNav = () => {
  const { toggleNav, isNavOpened } = useNavToggle();

  const translateClass = isNavOpened ? "translate-x-0" : "-translate-x-full";

  return (
    <div>
      <div
        className={
          "fixed h-full w-full bg-white top-0 bottom-0 left-0 transition-transform ease-in-out duration-200 " +
          translateClass
        }
      >
        <FocusTrap isActive={isNavOpened}>
          <div className="p-4">
            <button
              className="h-10 w-10 text-2xl"
              onClick={toggleNav}
              tabIndex={isNavOpened ? 0 : -1}
              aria-hidden={!isNavOpened}
            >
              <IoCloseOutline />
              <VisuallyHidden>Close menu</VisuallyHidden>
            </button>

            <Spacer size={6} />

            <DocMenu />
          </div>
        </FocusTrap>
      </div>
    </div>
  );
};
