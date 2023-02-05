import { createContext, useContext } from "react";
import { Spacer } from "./Spacer";

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
      <section aria-labelledby={id} id={`${id}-section`} {...props}>
        {children}
      </section>
    </SectionContext.Provider>
  );
};

export interface SectionHeaderProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  titleAs?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  description?: React.ReactNode;
  action?: React.ReactNode;
  status?: React.ReactNode;
  name?: string;
  menu?: React.ReactNode;
}

export const SectionHeader = ({
  title,
  titleAs = "h2",
  description,
  action,
  status,
  name,
  menu,
  ...props
}: SectionHeaderProps) => {
  const id = useContext(SectionContext);
  const HeadingComponent = titleAs as any;

  return (
    <div {...props}>
      <Stack spacing={4}>
        <div className="flex flex-col md:flex-row md:justify-between gap-8">
          <div className="flex flex-row gap-8 flex-1">
            <div className="flex-1">
              <HeadingComponent
                as={titleAs}
                className="text-3xl font-semibold tracking-tight dark:text-white"
                id={id}
                name={name}
              >
                {title}
              </HeadingComponent>

              {description && (
                <>
                  <Spacer size={1} />
                  {description && (
                    <div className="text-gray-500 dark:text-slate-400 max-w-2xl font-light">
                      {description}
                    </div>
                  )}
                </>
              )}
            </div>

            {menu}
          </div>

          {action}
        </div>

        {status}
      </Stack>
    </div>
  );
};
