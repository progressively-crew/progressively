import { Box } from "@chakra-ui/react";
import { SkipNavContent } from "@chakra-ui/skip-nav";
import { HTMLAttributes } from "react";

export const Main = (props: HTMLAttributes<HTMLDivElement>) => (
  <SkipNavContent>
    <Box as="main" aria-labelledby="page-title" {...props} />
  </SkipNavContent>
);
