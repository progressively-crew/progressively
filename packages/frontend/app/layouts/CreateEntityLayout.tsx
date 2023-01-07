import React from "react";
import { Card, CardContent } from "~/components/Card";
import { Spacer } from "~/components/Spacer";

export interface CreateEntityLayoutProps {
  children: React.ReactNode;
  error?: React.ReactNode;
  status?: React.ReactNode;
  titleSlot: React.ReactNode;
  submitSlot: React.ReactNode;
  backLinkSlot: React.ReactNode;
  size?: "M" | "L";
}

export const CreateEntityLayout = ({
  children,
  error,
  status,
  titleSlot,
  submitSlot,
  backLinkSlot,
  size = "M",
}: CreateEntityLayoutProps) => {
  return (
    <main
      className={`mx-auto  lg:pt-20 lg:pb-20 ${
        size === "M" ? "max-w-2xl" : "max-w-4xl"
      }`}
      aria-labelledby="page-title"
    >
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
        <Card>
          <CardContent>
            {titleSlot}
            <Spacer size={8} />
            {children}
          </CardContent>

          <div className="flex justify-end px-8 py-4 bg-gray-100 dark:bg-slate-700">
            {submitSlot}
          </div>
        </Card>
      </div>

      <Spacer size={6} />
    </main>
  );
};
