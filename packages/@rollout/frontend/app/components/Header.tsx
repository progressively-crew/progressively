import { Box, Stack } from "@chakra-ui/react";
import { H1 } from "./H1";

export interface HeaderProps {
  title: string | React.ReactNode;
  description?: React.ReactNode;
  startAction?: React.ReactNode;
}

export const Header = ({ title, description, startAction }: HeaderProps) => {
  return (
    <Stack>
      <Box>
        <Box textAlign={["center", "left"]}>
          <H1>{title}</H1>
        </Box>

        {description}
      </Box>
      <Box width={["100%", "auto"]}>{startAction}</Box>
    </Stack>
  );
};
