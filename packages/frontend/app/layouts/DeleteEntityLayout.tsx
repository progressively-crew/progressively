import React from "react";
import { Section } from "~/components/Section";
import { User } from "~/modules/user/types";
import { styled } from "~/stitches.config";
import { DashboardLayout } from "./DashboardLayout";

export interface DeleteEntityLayoutProps {
  user: User;
  children: React.ReactNode;
  header: React.ReactNode;
  error?: React.ReactNode;
  confirmAction?: React.ReactNode;
  cancelAction?: React.ReactNode;
}

const ActionWrapper = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  gap: "$spacing$6",
  marginTop: "$spacing$6",

  "@mobile": {
    flexDirection: "column",
  },
});

const Wrapper = styled("div", {
  maxWidth: "80ch",
});

export const DeleteEntityLayout = ({
  user,
  header,
  children,
  error,
  confirmAction,
  cancelAction,
}: DeleteEntityLayoutProps) => {
  return (
    <DashboardLayout user={user} header={header}>
      <Wrapper>
        <Section>
          {error}

          {children}

          <ActionWrapper>
            {cancelAction}
            {confirmAction}
          </ActionWrapper>
        </Section>
      </Wrapper>
    </DashboardLayout>
  );
};
