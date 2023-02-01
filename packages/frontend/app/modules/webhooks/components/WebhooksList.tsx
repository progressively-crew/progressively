import { Card } from "~/components/Card";
import { MenuButton } from "~/components/MenuButton";
import { Typography } from "~/components/Typography";
import { Webhook } from "../types";
import { WebhookEvent } from "./WebhookEvent";

export interface WebhooksListProps {
  webhooks: Array<Webhook>;
  projectId: string;
  envId: string;
  flagId: string;
}
export const WebhooksList = ({
  webhooks,
  projectId,
  envId,
  flagId,
}: WebhooksListProps) => {
  return (
    <Card>
      {webhooks.map((webhook) => (
        <div
          className="px-6 py-4 grid grid-cols-3 items-center last:border-b-0 border-b border-gray-200 dark:border-slate-700"
          key={webhook.uuid}
        >
          <a
            href={webhook.endpoint}
            className="font-semibold dark:text-slate-50 text-sm underline"
          >
            {webhook.endpoint}
          </a>

          <Typography className="text-sm">
            On event <WebhookEvent value={webhook.event} />
          </Typography>

          <div className="justify-end flex items-center">
            <MenuButton
              items={[
                {
                  label: "Remove",
                  href: `/dashboard/projects/${projectId}/environments/${envId}/flags/${flagId}/webhooks/${webhook.uuid}/delete`,
                  noInitial: true,
                },
                {
                  label: "Copy secret",
                  onClick: () => {
                    navigator.clipboard.writeText(webhook.secret);
                  },
                  noInitial: true,
                },
              ]}
              label={"Actions on webhook"}
            />
          </div>
        </div>
      ))}
    </Card>
  );
};
