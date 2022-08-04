import { createContext, HTMLAttributes, useContext } from "react";
import { Card } from "~/components/CardGroup";
import { Heading } from "./Heading";
import { VisuallyHidden } from "./VisuallyHidden";
import { Spacer } from "./Spacer";

const SectionContext = createContext<string | undefined>(undefined);

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  as?: any;
  id?: string;
}

export const CardSection = (props: SectionProps) => {
  return (
    <Card>
      <Section {...props} />
    </Card>
  );
};

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
    <div {...props}>
      {hiddenTitle ? (
        <VisuallyHidden>
          <Heading as={titleAs} id={id} size="xl">
            {title}
          </Heading>
        </VisuallyHidden>
      ) : (
        <Heading as={titleAs} id={id} size="xl">
          {title}
        </Heading>
      )}

      {description && (
        <>
          <Spacer size={2} />
          {description}
        </>
      )}

      {endAction}
    </div>
  );
};

export const SectionContent = (props: HTMLAttributes<HTMLDivElement>) => (
  <div {...props} />
);
