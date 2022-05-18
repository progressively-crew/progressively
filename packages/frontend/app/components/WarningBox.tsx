import { Box, Flex, Icon } from "@chakra-ui/react";
import { AiOutlineWarning } from "react-icons/ai";
import { Li, Ul } from "./Ul";

export interface WarningBoxProps {
  title: React.ReactNode;
  list?: {
    [key: string]: string;
  };
}

export const WarningBox = ({ list, title }: WarningBoxProps) => {
  const warnings = list ? Object.keys(list) : undefined;

  return (
    <Box
      as="figure"
      tabIndex={-1}
      className="warning-box"
      bg="warning.50"
      color="warning.900"
      p={3}
      borderRadius={4}
      borderWidth={1}
      borderColor="warning.200"
    >
      <Flex as="figcaption">
        <Icon as={AiOutlineWarning} w={6} h={6} aria-hidden mr={2} />
        <strong>{title}</strong>
      </Flex>
      {list && warnings && (
        <Box pl={8} mt={2}>
          <Ul>
            {warnings.map((warningKey) => (
              <Li key={`warning-${warningKey}`} id={`warning-${warningKey}`}>
                {list[warningKey]}
              </Li>
            ))}
          </Ul>
        </Box>
      )}
    </Box>
  );
};
