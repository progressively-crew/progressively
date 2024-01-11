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
        {status && <>{status}</>}

        <Spacer size={2} />
        {children}
      </Dialog>
    </main>
  );
};
