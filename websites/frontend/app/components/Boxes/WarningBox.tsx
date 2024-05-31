import { AiOutlineWarning } from "react-icons/ai";
import { HStack } from "../HStack";
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
    <figure
      tabIndex={-1}
      className="warning-box p-4 bg-orange-100 text-orange-700 rounded-xl border-l-8 border-l-orange-600"
    >
      <div>
        <HStack spacing={2}>
          <AiOutlineWarning aria-hidden />

          <figcaption>
            <strong>{title}</strong>
          </figcaption>
        </HStack>

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
