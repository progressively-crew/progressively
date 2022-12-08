import type { TitleField } from "@prismicio/types";

export interface TitleProps {
  value: TitleField;
}

export const Title = ({ value }: TitleProps) => {
  return <h1>{value[0]?.text}</h1>;
};
