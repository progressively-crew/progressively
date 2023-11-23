import { ComparatorEnum, Rule } from "../types";

let id = 0;

export const createEmptyRule = (): Rule => {
  id++;
  return {
    uuid: String(id), //this is a fake id only for usage with KEYS in React
    fieldName: "",
    fieldValue: "",
    fieldComparator: ComparatorEnum.Equals,
  };
};
