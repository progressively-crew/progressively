import { Box } from "@chakra-ui/react";
import { HTMLAttributes } from "react";
import { SkipNavContent } from "./SkipNav";

export const Main = (props: HTMLAttributes<HTMLDivElement>) => (
  <SkipNavContent>
    <Box as="main" aria-labelledby="page-title" {...props} />
  </SkipNavContent>
);
