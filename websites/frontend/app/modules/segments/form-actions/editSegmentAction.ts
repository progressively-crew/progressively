import { ComparatorEnum, RuleUpdateDto } from "~/modules/rules/types";
import { SegmentUpsertDTO } from "../types";
import { upsertSegments } from "../services/upsertSegments";

const isValidRule = (rule: RuleUpdateDto) => {
  return rule.fieldName && rule.fieldComparator && rule.fieldValue;
};

const mapRawRuleToActualRule = (rawRule: any): RuleUpdateDto => {
  return {
    fieldName: rawRule["field-name"],
    fieldComparator:
      rawRule["field-comparator"] === ComparatorEnum.Contains
        ? ComparatorEnum.Contains
        : ComparatorEnum.Equals,
    fieldValue: rawRule["field-value"],
  };
};

const mapSegment = (rawSegment: any): SegmentUpsertDTO => {
  const rawRules = rawSegment.rules || [];
  const rules: Array<RuleUpdateDto> = rawRules
    .map((rawRule: any) => mapRawRuleToActualRule(rawRule))
    .filter((rule: RuleUpdateDto) => isValidRule(rule));

  return {
    uuid: rawSegment.uuid || null,
    name: rawSegment.name,
    segmentRules: rules,
  };
};

export const editSegmentAction = async (
  projectId: string,
  formObject: any,
  authCookie: string
) => {
  // TODO: move the notion of strategies from here

  const rawSegments = formObject?.strategies || [];
  const segmentsToUpsert: Array<SegmentUpsertDTO> = rawSegments.map(mapSegment);

  try {
    await upsertSegments(projectId, segmentsToUpsert, authCookie);

    return {
      successSegmentEdited: true,
    };
  } catch (error: unknown) {
    console.log("fzfaaz", error);
    return {
      errors: {
        message: (error as Error).message,
      },
    };
  }
};
