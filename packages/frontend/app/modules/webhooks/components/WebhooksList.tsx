import { MenuButton } from "~/components/MenuButton";
import { Webhook } from "../types";
import { WebhookEvent } from "./WebhookEvent";
import { ButtonCopy } from "~/components/ButtonCopy";
import { Table, Tbody, Th, Tr, Td } from "~/components/Table";

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
    <Table>
      <caption className="sr-only">
        Webhooks triggered when something happens
      </caption>
      <thead>
        <tr>
          <Th>Webhook endpoint</Th>
          <Th>Event</Th>
          <Th>Secret</Th>
          <Th>Actions</Th>
        </tr>
      </thead>
      <Tbody>
        {webhooks.map((webhook) => (
          <Tr key={webhook.uuid}>
            <Td>{webhook.endpoint}</Td>
            <Td>
              <WebhookEvent value={webhook.event} />
            </Td>
            <Td>
              <ButtonCopy
                toCopyAlternative={"the webhook secret"}
                toCopy={webhook.secret}
                size="S"
              >
                Secret *********
              </ButtonCopy>
            </Td>
            <Td style={{ width: 100 }}>
              <div className="flex justify-center w-full">
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
              </div>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
