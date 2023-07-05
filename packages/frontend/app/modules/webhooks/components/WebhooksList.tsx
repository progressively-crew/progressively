import { CardEntity } from "~/components/Entity/Entity";
import { MenuButton } from "~/components/MenuButton";
import { Webhook } from "../types";
import { WebhookEvent } from "./WebhookEvent";
import { ButtonCopy } from "~/components/ButtonCopy";

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
    <ul className="flex flex-col gap-4">
      {webhooks.map((webhook) => (
        <li key={webhook.uuid}>
          <CardEntity
            title={webhook.endpoint}
            description={
              <p>
                On event <WebhookEvent value={webhook.event} />
              </p>
            }
            actions={
              <div className="hidden md:block">
                <ButtonCopy
                  toCopyAlternative={"the webhook secret"}
                  toCopy={webhook.secret}
                >
                  Secret *********
                </ButtonCopy>
              </div>
            }
            menu={
              <MenuButton
                items={[
                  {
                    label: "Remove",
                    href: `/dashboard/projects/${projectId}/environments/${envId}/flags/${flagId}/webhooks/${webhook.uuid}/delete`,
                  },
                ]}
                label={"Actions on webhook"}
                variant="action"
              />
            }
          />
        </li>
      ))}
    </ul>
  );
};
