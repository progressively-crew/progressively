import React from "react";
import { Section } from "~/components/Section";
import { User } from "~/modules/user/types";
import { styled } from "~/stitches.config";
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

const ActionWrapper = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "$spacing$6",
});

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
      <Section>
        {error}

        {children}

        <ActionWrapper>
          {cancelAction}
          {confirmAction}
        </ActionWrapper>
      </Section>
    </DashboardLayout>
  );
};
