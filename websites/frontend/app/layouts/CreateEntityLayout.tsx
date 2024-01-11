import React from "react";
import { Dialog } from "~/components/Dialog/Dialog";
import { Spacer } from "~/components/Spacer";

export interface CreateEntityLayoutProps {
  children: React.ReactNode;
  status?: React.ReactNode;
  titleSlot: React.ReactNode;
  submitSlot?: React.ReactNode;
  closeSlot?: React.ReactNode;
}

export const CreateEntityLayout = ({
  children,
  status,
  titleSlot,
  submitSlot,
  closeSlot,
}: CreateEntityLayoutProps) => {
  return (
    <main>
      <Dialog action={submitSlot} title={titleSlot} closeBtn={closeSlot}>
        {status && (
          <>
            <Spacer size={4} />
            {status}
          </>
        )}

        <Spacer size={4} />
        {children}
      </Dialog>
    </main>
  );
};
