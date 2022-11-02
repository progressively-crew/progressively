import { AiOutlineWarning } from "react-icons/ai";
import { Spacer } from "../Spacer";
import { Li, Ul } from "../Ul";

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
      <AiOutlineWarning aria-hidden />

      <div>
        <figcaption>
          <strong>{title}</strong>
        </figcaption>

        {warnings && list && warnings.length > 0 ? (
          <>
            <Spacer size={4} />
            <Ul>
              {warnings.map((warningKey) => (
                <Li key={`warning-${warningKey}`} id={`warning-${warningKey}`}>
                  {list[warningKey]}
                </Li>
              ))}
            </Ul>
          </>
        ) : null}
      </div>
    </figure>
  );
};
