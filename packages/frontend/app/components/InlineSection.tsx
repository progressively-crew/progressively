import { HTMLAttributes } from "react";
import { Typography } from "./Typography";

export const InlineSection = (props: HTMLAttributes<HTMLDivElement>) => (
  <section {...props} />
);

export const InlineSectionTitle = (
  props: HTMLAttributes<HTMLHeadingElement>
) => <h2 {...props} />;

export const InlineSectionDescription = (
  props: HTMLAttributes<HTMLParagraphElement>
) => <Typography {...props} />;
