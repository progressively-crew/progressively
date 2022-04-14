import { Flex, FlexProps, Icon } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";

export interface SuccessBoxProps extends FlexProps {
  children: React.ReactNode;
  id: string;
}

export const SuccessBox = ({ children, id, ...props }: SuccessBoxProps) => {
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    boxRef?.current?.focus();
  }, []);

  return (
    <Flex
      as="p"
      ref={boxRef}
      tabIndex={-1}
      id={id}
      className="success-box"
      bg="success.50"
      color="success.900"
      p={3}
      borderRadius={4}
      borderWidth={1}
      borderColor="success.200"
      {...props}
    >
      <Icon as={AiOutlineCheckCircle} w={6} h={6} aria-hidden mr={2} />
      {children}
    </Flex>
  );
};
