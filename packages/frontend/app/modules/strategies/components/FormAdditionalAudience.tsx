import { Form } from "@remix-run/react";
import { ConditionalAudience } from "~/modules/misc/components/ConditionalAudience";
import { Variant } from "~/modules/variants/types";
import { AdditionalAudienceRetrieveDTO, StrategyValueToServe } from "../types";

export interface FormAdditionalAudienceProps {
  additionalAudiences: Array<AdditionalAudienceRetrieveDTO>;
  projectId: string;
  envId: string;
  flagId: string;
  variants: Array<Variant>;
}

export const FormAdditionalAudience = ({
  additionalAudiences,
  projectId,
  envId,
  flagId,
  variants,
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
            variants={variants}
            valueToServe={el.valueToServe}
            valueToServeType={el.valueToServeType as StrategyValueToServe}
            showAdditionalFields
          />
        ))}
      </div>
    </Form>
  );
};
