import { HTMLAttributes } from "react";

export interface DeviceOnlyProps extends HTMLAttributes<HTMLDivElement> {
  as?: string;
}

export const MobileOnly = ({ as: htmlAs, ...props }: DeviceOnlyProps) => {
  const Root = htmlAs || "div";

  return <Root {...props} />;
};
export const NotMobile = ({ as: htmlAs, ...props }: DeviceOnlyProps) => {
  const Root = htmlAs || "div";

  return <Root {...props} />;
};
