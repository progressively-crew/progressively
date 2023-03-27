import { Form } from "@remix-run/react";
import { Eligibility } from "../types";
import { ConditionalAudience } from "../../misc/components/ConditionalAudience";

export interface FormEligibilityProps {
  initialEligibilites: Array<Eligibility>;
  projectId: string;
  envId: string;
  flagId: string;
}

export const FormEligibility = ({
  initialEligibilites,
  projectId,
  envId,
  flagId,
}: FormEligibilityProps) => {
  return (
    <Form method="post" id="form-update-eligibility">
      <input type="hidden" name="_type" value="update-eligibility" />

      <div className="flex flex-col gap-1">
        {initialEligibilites.map((el) => (
          <ConditionalAudience
            key={el.uuid}
            removeLink={`/dashboard/projects/${projectId}/environments/${envId}/flags/${flagId}/eligibilities/${el.uuid}/delete`}
            uuid={el.uuid}
            fieldName={el.rule.fieldName}
            fieldValue={el.rule.fieldValue}
            fieldComparator={el.rule.fieldComparator}
          />
        ))}
      </div>
    </Form>
  );
};
