import { createContext, useContext } from "react";
import { Heading } from "./Heading";
import { Spacer } from "./Spacer";
import { styled } from "~/stitches.config";
import { HStack } from "./HStack";
import { Stack } from "./Stack";

const SectionContext = createContext<string | undefined>(undefined);

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  as?: any;
  id?: string;
}

export const Section = ({ children, id, ...props }: SectionProps) => {
  return (
    <SectionContext.Provider value={id}>
      <section aria-labelledby={id} {...props}>
        {children}
      </section>
    </SectionContext.Provider>
  );
};

export interface SectionHeaderProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  titleAs?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  description?: React.ReactNode;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  status?: React.ReactNode;
}

const SectionHeaderWrapper = styled("div", {
  marginBottom: "$spacing$4",
});

const DescriptionWrapper = styled("div", {
  "& p": {
    color: "$hadesLight",
  },
});

export const SectionHeader = ({
  title,
  titleAs = "h2",
  description,
  icon,
  action,
  status,
  ...props
}: SectionHeaderProps) => {
  const id = useContext(SectionContext);

  const fontSize = titleAs === "h2" ? "earth" : "mars";

  return (
    <SectionHeaderWrapper {...props}>
      <Stack spacing={4}>
        <HStack
          justifyContent="space-between"
          alignItems="flex-start"
          direction={{ "@tablet": "column" }}
          gap={{ "@tablet": "3" }}
        >
          <div>
            <Heading as={titleAs} id={id} fontSize={fontSize} icon={icon}>
              {title}
            </Heading>
            {description && (
              <>
                <Spacer size={2} />
                {description && (
                  <DescriptionWrapper>{description}</DescriptionWrapper>
                )}
              </>
            )}
          </div>
          {action}
        </HStack>

        {status}
      </Stack>
    </SectionHeaderWrapper>
  );
};
