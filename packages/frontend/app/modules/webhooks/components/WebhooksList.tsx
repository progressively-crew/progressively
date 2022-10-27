import { ButtonCopy } from "~/components/ButtonCopy";
import { DeleteButton } from "~/components/Buttons/DeleteButton";
import { Link } from "~/components/Link";
import { RawTable } from "~/components/RawTable";
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
        <tr>
          <th>End point</th>
          <th>Event</th>
          <th>Secret</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {webhooks.map((webhook) => (
          <tr key={webhook.uuid}>
            <td>
              <Link
                href={webhook.endpoint}
                target="blank"
                rel="noopener noreferer"
              >
                {webhook.endpoint}
              </Link>
            </td>
            <td>
              <WebhookEvent value={webhook.event} />
            </td>
            <td>
              <ButtonCopy
                variant="tertiary"
                toCopy={webhook.secret}
                small
                aria-label="This is a hidden secret. Press to copy."
              >
                ******
              </ButtonCopy>
            </td>

            <td>
              <DeleteButton
                small
                variant="tertiary"
                to={`/dashboard/projects/${projectId}/environments/${envId}/flags/${flagId}/webhooks/${webhook.uuid}/delete`}
              >
                Remove
              </DeleteButton>
            </td>
          </tr>
        ))}
      </tbody>
    </RawTable>
  );
};
