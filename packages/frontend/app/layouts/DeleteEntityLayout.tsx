import React from "react";
import { Card, CardContent } from "~/components/Card";
import { Spacer } from "~/components/Spacer";
import { useProject } from "~/modules/projects/contexts/useProject";
import { UserRoles } from "~/modules/projects/types";

import ForbiddenPage from "~/routes/403";

export interface DeleteEntityLayoutProps {
  children: React.ReactNode;
  error?: React.ReactNode;
  confirmAction?: React.ReactNode;
  cancelAction?: React.ReactNode;
  titleSlot: React.ReactNode;
  backLinkSlot: React.ReactNode;
}

export const DeleteEntityLayout = ({
  children,
  error,
  confirmAction,
  cancelAction,
  titleSlot,
  backLinkSlot,
}: DeleteEntityLayoutProps) => {
  const { userRole } = useProject();

  if (userRole !== UserRoles.Admin) {
    return <ForbiddenPage />;
  }

  return (
    <main className="mx-auto max-w-2xl lg:pt-20" aria-labelledby="page-title">
      {error}
      <Spacer size={4} />

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

          <div className="flex justify-between px-8 py-4 bg-red-50 gap-8">
            {cancelAction}
            {confirmAction}
          </div>
        </Card>
      </div>
    </main>
  );
};
