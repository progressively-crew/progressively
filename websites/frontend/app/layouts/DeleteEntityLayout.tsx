import React from "react";
import { Dialog } from "~/components/Dialog/Dialog";
import { useSetInert } from "~/components/Inert/hooks/useSetInert";
import { Spacer } from "~/components/Spacer";
import { useProject } from "~/modules/projects/contexts/useProject";
import { UserRoles } from "~/modules/projects/types";
import ForbiddenPage from "~/routes/403";

export interface DeleteEntityLayoutProps {
  children: React.ReactNode;
  confirmAction?: React.ReactNode;
  error?: React.ReactNode;
  cancelAction?: React.ReactNode;
  titleSlot: React.ReactNode;
  closeSlot: React.ReactNode;
}

export const DeleteEntityLayout = ({
  error,
  children,
  confirmAction,
  cancelAction,
  titleSlot,
  closeSlot,
}: DeleteEntityLayoutProps) => {
  const { userRole } = useProject();
  useSetInert();

  if (userRole !== UserRoles.Admin) {
    return (
      <main>
        <Dialog
          title={titleSlot}
          closeBtn={closeSlot}
          action={
            <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-8">
              {cancelAction}
            </div>
          }
        >
          <ForbiddenPage rootAs="div" />
        </Dialog>
      </main>
    );
  }

  return (
    <main>
      <Dialog
        scheme="ERROR"
        action={
          <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-8">
            {cancelAction}
            {confirmAction}
          </div>
        }
        title={titleSlot}
        closeBtn={closeSlot}
      >
        {error && (
          <>
            <Spacer size={4} />
            {error}
          </>
        )}

        <Spacer size={4} />
        {children}
      </Dialog>
    </main>
  );
};
