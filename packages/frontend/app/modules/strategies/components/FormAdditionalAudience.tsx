import { Form } from "@remix-run/react";
import { ConditionalAudience } from "~/modules/misc/components/ConditionalAudience";
import { AdditionalAudienceRetrieveDTO } from "../types";

export interface FormAdditionalAudienceProps {
  additionalAudiences: Array<AdditionalAudienceRetrieveDTO>;
  projectId: string;
  envId: string;
  flagId: string;
}

export const FormAdditionalAudience = ({
  additionalAudiences,
  projectId,
  envId,
  flagId,
}: FormAdditionalAudienceProps) => {
  return (
    <Form method="post" id="form-update-eligibility">
      <input type="hidden" name="_type" value="update-eligibility" />

      <div className="flex flex-col gap-1">
        {additionalAudiences.map((el) => (
          <ConditionalAudience
            key={el.uuid}
            removeLink={`/dashboard/projects/${projectId}/environments/${envId}/flags/${flagId}/strategies/${el.uuid}/delete`}
            uuid={el.uuid}
            fieldName={el.fieldName}
            fieldValue={el.fieldValue}
            fieldComparator={el.fieldComparator}
          />
        ))}
      </div>
    </Form>
  );
};
