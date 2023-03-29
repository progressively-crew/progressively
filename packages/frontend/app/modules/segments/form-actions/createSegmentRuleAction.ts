import { createSegmentRule } from "../services/createSegmentRule";

export const createSegmentRuleAction = async (
  segmentId: string,
  authCookie: string
  // eslint-disable-next-line sonarjs/cognitive-complexity
) => {
  const createdRule = await createSegmentRule(segmentId, authCookie);

  return {
    rule: createdRule,
  };
};
