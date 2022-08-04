import { forwardRef } from "react";

export const RawTable = forwardRef((props: any, ref: any) => {
  return (
    <div>
      <table ref={ref} {...props} />
    </div>
  );
});

RawTable.displayName = "RawTable";
