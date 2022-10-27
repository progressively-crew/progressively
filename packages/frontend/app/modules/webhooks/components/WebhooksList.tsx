import { DeleteButton } from "~/components/Buttons/DeleteButton";
import { RawTable } from "~/components/RawTable";
import { Webhook } from "../types";

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
              <div>{webhook.endpoint}</div>
            </td>
            <td>
              <div>{webhook.event}</div>
            </td>
            <td>
              <div>{webhook.secret}</div>
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
