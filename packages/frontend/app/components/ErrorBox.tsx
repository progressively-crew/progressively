import { Box, Flex, Icon, ListItem, UnorderedList } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { MdErrorOutline } from "react-icons/md";

export interface ErrorBoxProps {
  list: {
    [key: string]: string;
  };
}

export const ErrorBox = ({ list }: ErrorBoxProps) => {
  const boxRef = useRef<HTMLDivElement>(null);

  const errors = Object.keys(list);

  useEffect(() => {
    boxRef?.current?.focus();
  }, []);

  const label =
    errors.length === 1
      ? `The following error has been found:`
      : `The following ${errors.length} errors have been found:`;

  return (
    <Box
      as="figure"
      ref={boxRef}
      tabIndex={-1}
      className="error-box"
      bg="error.50"
      color="error.900"
      p={3}
      borderRadius={4}
      borderWidth={1}
      borderColor="error.200"
    >
      <Flex as="figcaption">
        <Icon as={MdErrorOutline} w={6} h={6} aria-hidden mr={2} />
        <strong>{label}</strong>
      </Flex>
      <UnorderedList pl={8} mt={2}>
        {errors.map((errorKey) => (
          <ListItem key={`error-${errorKey}`} id={`error-${errorKey}`}>
            {list[errorKey]}
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  );
};
