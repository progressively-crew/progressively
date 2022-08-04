import React from "react";
import { Section } from "~/components/Section";
import { User } from "~/modules/user/types";

import { DashboardLayout } from "./DashboardLayout";

export interface DeleteEntityLayoutProps {
  user: User;
  children: React.ReactNode;
  breadcrumb?: React.ReactNode;
  header: React.ReactNode;
  error?: React.ReactNode;
  confirmAction?: React.ReactNode;
  cancelAction?: React.ReactNode;
}

export const DeleteEntityLayout = ({
  user,
  breadcrumb,
  header,
  children,
  error,
  confirmAction,
  cancelAction,
}: DeleteEntityLayoutProps) => {
  return (
    <DashboardLayout user={user} header={header} breadcrumb={breadcrumb}>
      <div>
        <Section>
          {error}

          {children}

          <div>
            {cancelAction}
            {confirmAction}
          </div>
        </Section>
      </div>
    </DashboardLayout>
  );
};
