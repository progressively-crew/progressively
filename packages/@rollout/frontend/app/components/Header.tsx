import { Flex, Box, Stack } from "@chakra-ui/react";
import { H1 } from "./H1";

export interface HeaderProps {
  title: string | React.ReactNode;
  description?: React.ReactNode;
  startAction?: React.ReactNode;
  endAction?: React.ReactNode;
}

export const Header = ({
  title,
  description,
  startAction,
  endAction,
}: HeaderProps) => {
  return (
    <Flex justifyContent="space-between">
      <Stack>
        <Box>
          <H1>{title}</H1>
          {description}
        </Box>
        <Box>{startAction}</Box>
      </Stack>

      {endAction}
    </Flex>
  );
};
