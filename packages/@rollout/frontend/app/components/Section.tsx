import { Box, Flex, Heading } from "@chakra-ui/react";
import { createContext, useContext } from "react";

const SectionContext = createContext<string | undefined>(undefined);

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  size?: "S" | "M";
  as?: any;
  id?: string;
}

export const Section = ({
  children,
  size = "S",
  id,
  ...props
}: SectionProps) => {
  return (
    <SectionContext.Provider value={id}>
      <Box
        bg="backgroundContent"
        borderRadius={8}
        p={size === "S" ? 4 : 8}
        boxShadow="lg"
        aria-labelledby={id}
        {...props}
      >
        {children}
      </Box>
    </SectionContext.Provider>
  );
};

export interface SectionHeaderProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  titleAs?: any;
  endAction?: React.ReactNode;
  description?: React.ReactNode;
}

export const SectionHeader = ({
  title,
  titleAs = "h2",
  endAction,
  description,
  ...props
}: SectionHeaderProps) => {
  const id = useContext(SectionContext);

  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={["flex-start", "center"]}
      pb={8}
      direction={["column", "row"]}
      {...props}
    >
      <Box p={4}>
        <Heading as={titleAs} id={id} size="lg">
          {title}
        </Heading>
        {description}
      </Box>

      {endAction ? (
        <Box flexShrink={0} ml={[4, description ? 2 : 0]}>
          {endAction}
        </Box>
      ) : null}
    </Flex>
  );
};
