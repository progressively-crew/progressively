import { Box, Flex, Heading, VisuallyHidden } from "@chakra-ui/react";
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
  titleHidden?: boolean;
  endAction?: React.ReactNode;
  description?: React.ReactNode;
}

export const SectionHeader = ({
  title,
  titleAs = "h2",
  titleHidden = false,
  endAction,
  description,
  ...props
}: SectionHeaderProps) => {
  const id = useContext(SectionContext);
  const TitleRoot = titleHidden ? VisuallyHidden : Box;

  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={"center"}
      pb={8}
      {...props}
    >
      <TitleRoot mr={2} p={4}>
        <Heading as={titleAs} id={id} size="lg">
          {title}
        </Heading>
        {description}
      </TitleRoot>

      {endAction ? <Box flexShrink={0}>{endAction}</Box> : null}
    </Flex>
  );
};
