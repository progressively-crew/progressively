import { useNavToggle } from "./hooks/useNavToggle";

import { Spacer } from "../Spacer";
import { FocusTrap } from "../FocusTrap";
import { DocMenu } from "./DocMenu";

export const MobileNav = () => {
  const { toggleNav, isNavOpened } = useNavToggle();

  const translateClass = isNavOpened ? "translate-x-0" : "-translate-x-full";

  return (
    <div>
      <div
        className={
          "absolute h-full w-full bg-white top-0 bottom-0 left-0 transition-transform ease-in-out duration-200 " +
          translateClass
        }
      >
        <FocusTrap isActive={isNavOpened}>
          <div className="p-4">
            <button
              onClick={toggleNav}
              tabIndex={isNavOpened ? 0 : -1}
              aria-hidden={!isNavOpened}
            >
              Close menu
            </button>

            <Spacer size={12} />

            <DocMenu />
          </div>
        </FocusTrap>
      </div>
    </div>
  );
};
