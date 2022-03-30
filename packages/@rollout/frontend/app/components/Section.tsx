import { Box, Flex, Heading } from "@chakra-ui/react";
import { createContext, useContext } from "react";

const SectionContext = createContext<string | undefined>(undefined);

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  as?: any;
  id?: string;
}

export const Section = ({ children, id, ...props }: SectionProps) => {
  return (
    <SectionContext.Provider value={id}>
      <Box
        bg="backgroundContent"
        as="section"
        borderRadius={16}
        p={[2, 8]}
        boxShadow="md"
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
  titleAs?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
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
      direction={["column", "row"]}
      p={4}
      {...props}
    >
      <Box maxW={endAction ? "xl" : undefined}>
        <Heading as={titleAs} id={id} size="lg" pb={1}>
          {title}
        </Heading>
        <Box fontSize="xl" color="textlight">
          {description}
        </Box>
      </Box>

      {endAction ? (
        <Box flexShrink={0} ml={[0, description ? 2 : 0]} mt={[4, 0]}>
          {endAction}
        </Box>
      ) : null}
    </Flex>
  );
};
