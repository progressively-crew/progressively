import type { TitleField } from "@prismicio/types";

export interface TitleProps {
  value: TitleField;
}

export const Title = ({ value }: TitleProps) => {
  return (
    <h1 className="font-bold leading-tight text-5xl max-w-screen-md">
      {value[0]?.text}
    </h1>
  );
};
