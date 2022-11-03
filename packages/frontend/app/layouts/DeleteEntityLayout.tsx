import React from "react";
import { Card, CardContent } from "~/components/Card";
import { Section } from "~/components/Section";
import { Spacer } from "~/components/Spacer";
import { User } from "~/modules/user/types";
import { DashboardLayout } from "./DashboardLayout";

export interface DeleteEntityLayoutProps {
  user: User;
  children: React.ReactNode;
  header: React.ReactNode;
  error?: React.ReactNode;
  confirmAction?: React.ReactNode;
  cancelAction?: React.ReactNode;
}

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
      <div className="mx-auto max-w-2xl">
        <Card>
          <CardContent>
            <Section>
              {error}

              {children}

              <Spacer size={6} />

              <div className="inline-flex flex-wrap gap-3 justify-center">
                {cancelAction}
                {confirmAction}
              </div>
            </Section>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};
