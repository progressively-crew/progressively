import { AiOutlineWarning } from "react-icons/ai";
import { Li, Ul } from "./Ul";

export interface WarningBoxProps {
  title: React.ReactNode;
  list?: {
    [key: string]: string;
  };
}

export const WarningBox = ({ list, title }: WarningBoxProps) => {
  const warnings = list ? Object.keys(list) : undefined;

  return (
    <figure tabIndex={-1}>
      <figcaption>
        <AiOutlineWarning aria-hidden />
        <strong>{title}</strong>
      </figcaption>

      {list && warnings && (
        <Ul>
          {warnings.map((warningKey) => (
            <Li key={`warning-${warningKey}`} id={`warning-${warningKey}`}>
              {list[warningKey]}
            </Li>
          ))}
        </Ul>
      )}
    </figure>
  );
};
