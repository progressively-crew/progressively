import React from "react";
import { Card, CardContent } from "~/components/Card";
import { Section } from "~/components/Section";
import { Spacer } from "~/components/Spacer";
import { User } from "~/modules/user/types";
import { DashboardLayout } from "./DashboardLayout";

export interface CreateEntityLayoutProps {
  children: React.ReactNode;
  error?: React.ReactNode;
  status?: React.ReactNode;
}

export const CreateEntityLayout = ({
  children,
  error,
  status,
}: CreateEntityLayoutProps) => {
  return (
    <div className="mx-auto max-w-2xl">
      {error}

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
  );
};
