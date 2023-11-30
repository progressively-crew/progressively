import React, { useEffect } from "react";
import { Card, CardContent } from "~/components/Card";
import { useInert } from "~/components/Inert/hooks/useInert";
import { Spacer } from "~/components/Spacer";

export interface CreateEntityLayoutProps {
  children: React.ReactNode;
  error?: React.ReactNode;
  status?: React.ReactNode;
  titleSlot: React.ReactNode;
  submitSlot: React.ReactNode;
  backLinkSlot: React.ReactNode;
}

export const CreateEntityLayout = ({
  children,
  error,
  status,
  titleSlot,
  submitSlot,
  backLinkSlot,
}: CreateEntityLayoutProps) => {
  const { setInert } = useInert();

  useEffect(() => {
    setInert(true);

    return () => {
      setInert(false);
    };
  }, []);

  return (
    <div className="fixed h-full w-full inset-0 backdrop-blur-md bg-slate-300/30">
      <div className="mx-auto max-w-2xl lg:pt-20 px-4 md:px-12">
        <main>
          {error}

          <Spacer size={4} />

          {status && (
            <div>
              {status}
              <Spacer size={4} />
            </div>
          )}

          <div className="inline-block motion-safe:animate-fade-enter-bottom motion-safe:opacity-0">
            {backLinkSlot}
          </div>

          <Spacer size={2} />

          <div
            className="motion-safe:animate-fade-enter-bottom motion-safe:opacity-0"
            style={{
              animationDelay: "300ms",
            }}
          >
            <Card footer={submitSlot}>
              <CardContent>
                {titleSlot}
                <Spacer size={8} />
                {children}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};
