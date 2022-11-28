import React from "react";
import { Card, CardContent } from "~/components/Card";
import { Section } from "~/components/Section";
import { Spacer } from "~/components/Spacer";
import { User } from "~/modules/user/types";
import { DashboardLayout } from "./DashboardLayout";

export interface CreateEntityLayoutProps {
  user: User;
  children: React.ReactNode;
  header?: React.ReactNode;
  error?: React.ReactNode;
  status?: React.ReactNode;
  title: React.ReactNode;
}

export const CreateEntityLayout = ({
  user,
  header,
  children,
  error,
  status,
  title,
}: CreateEntityLayoutProps) => {
  return (
    <DashboardLayout user={user} header={header}>
      <div className="mx-auto max-w-lg">
        {error}

        {title}

        <Spacer size={4} />

        {status && (
          <div>
            {status}
            <Spacer size={4} />
          </div>
        )}

        {children}

        <Spacer size={6} />
      </div>
    </DashboardLayout>
  );
};
