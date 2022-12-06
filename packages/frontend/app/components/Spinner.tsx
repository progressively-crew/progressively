import { CgSpinner } from "react-icons/cg";

export const Spinner = () => {
  return (
    <div className="animate-spin" aria-hidden>
      <CgSpinner />
    </div>
  );
};
