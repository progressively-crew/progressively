import { ButtonCopy } from "~/components/ButtonCopy";
import { DeleteButton } from "~/components/Buttons/DeleteButton";
import { Link } from "~/components/Link";
import { RawTable, Td, Th, Tr } from "~/components/RawTable";
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
    <RawTable>
      <thead>
        <Tr>
          <Th>End point</Th>
          <Th>Event</Th>
          <Th>Secret</Th>
          <Th>Actions</Th>
        </Tr>
      </thead>
      <tbody>
        {webhooks.map((webhook) => (
          <Tr key={webhook.uuid}>
            <Td>
              <Link
                href={webhook.endpoint}
                target="blank"
                rel="noopener noreferer"
              >
                {webhook.endpoint}
              </Link>
            </Td>
            <Td>
              <WebhookEvent value={webhook.event} />
            </Td>
            <Td>
              <ButtonCopy
                toCopy={webhook.secret}
                aria-label="This is a hidden secret. Press to copy."
              >
                ******
              </ButtonCopy>
            </Td>

            <Td>
              <div className="inline-block">
                <DeleteButton
                  variant="secondary"
                  to={`/dashboard/projects/${projectId}/environments/${envId}/flags/${flagId}/webhooks/${webhook.uuid}/delete`}
                >
                  Remove
                </DeleteButton>
              </div>
            </Td>
          </Tr>
        ))}
      </tbody>
    </RawTable>
  );
};
