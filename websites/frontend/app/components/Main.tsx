import { HTMLAttributes } from "react";
import { SkipNavContent } from "./SkipNav";

export const Main = (props: HTMLAttributes<HTMLDivElement>) => (
  <SkipNavContent>
    <main aria-labelledby="page-title" {...props} />
  </SkipNavContent>
);
