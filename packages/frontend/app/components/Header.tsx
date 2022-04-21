import { Box, Flex } from "@chakra-ui/react";
import { H1 } from "./H1";

export interface HeaderProps {
  title: string | React.ReactNode;
  description?: React.ReactNode;
  startAction?: React.ReactNode;
}

export const Header = ({ title, description, startAction }: HeaderProps) => {
  return (
    <Flex alignItems={"center"} flexDirection="column">
      <H1>{title}</H1>

      {description && <Box mt={4}>{description}</Box>}

      <Box width={"auto"} mt={4}>
        {startAction}
      </Box>
    </Flex>
  );
};
