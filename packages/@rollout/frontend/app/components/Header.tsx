import { Box, Stack, HStack } from "@chakra-ui/react";
import { H1 } from "./H1";

export interface HeaderProps {
  title: string | React.ReactNode;
  description?: React.ReactNode;
  startAction?: React.ReactNode;

  icon?: React.ReactNode;
}

export const Header = ({
  title,
  description,
  startAction,
  icon,
}: HeaderProps) => {
  return (
    <Stack>
      <Box>
        <HStack spacing={2}>
          {icon}
          <H1>{title}</H1>
        </HStack>

        {description}
      </Box>
      <Box>{startAction}</Box>
    </Stack>
  );
};
