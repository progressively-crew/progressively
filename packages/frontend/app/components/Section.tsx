import { Box, Flex, Heading, VisuallyHidden } from "@chakra-ui/react";
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
      <Box as="section" aria-labelledby={id} {...props}>
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
  hiddenTitle?: boolean;
}

export const SectionHeader = ({
  title,
  titleAs = "h2",
  endAction,
  description,
  hiddenTitle,
  ...props
}: SectionHeaderProps) => {
  const id = useContext(SectionContext);

  return (
    <Flex
      alignItems={["flex-start", "center"]}
      justifyContent={hiddenTitle ? "flex-start" : "space-between"}
      direction={["column", "row"]}
      py={4}
      {...props}
    >
      <Box maxW={endAction ? "xl" : undefined}>
        {hiddenTitle ? (
          <VisuallyHidden>
            <Heading as={titleAs} id={id} size="xl" pb={1}>
              {title}
            </Heading>
          </VisuallyHidden>
        ) : (
          <Heading
            as={titleAs}
            id={id}
            size="xl"
            pb={1}
            color="header"
            fontWeight="medium"
          >
            {title}
          </Heading>
        )}

        <Box fontSize="xl" color="textlight" maxWidth="65ch">
          {description}
        </Box>
      </Box>

      {endAction ? (
        <Box flexShrink={0} mt={[4, 0]} width={["100%", "auto"]}>
          {endAction}
        </Box>
      ) : null}
    </Flex>
  );
};
