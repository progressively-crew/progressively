import { CardEntity } from "~/components/Entity/Entity";
import { MenuButton } from "~/components/MenuButton";
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
    <div className="flex flex-col gap-4">
      {webhooks.map((webhook) => (
        <CardEntity
          key={webhook.uuid}
          title={webhook.endpoint}
          description={
            <p>
              On event <WebhookEvent value={webhook.event} />
            </p>
          }
          menu={
            <MenuButton
              items={[
                {
                  label: "Copy secret",
                  onClick: () => {
                    navigator.clipboard.writeText(webhook.secret);
                  },
                  noInitial: true,
                },
                {
                  label: "Remove",
                  href: `/dashboard/projects/${projectId}/environments/${envId}/flags/${flagId}/webhooks/${webhook.uuid}/delete`,
                  noInitial: true,
                },
              ]}
              label={"Actions on webhook"}
              variant="action"
            />
          }
        />
      ))}
    </div>
  );
};
